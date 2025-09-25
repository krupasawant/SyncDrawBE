const express = require("express");
const router = express.Router();
const Design = require("../models/design");
const { Clerk } = require("@clerk/clerk-sdk-node");


const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

// GET last 10 designs for authenticated user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.auth(); // verified Clerk user ID

    // Find designs where user is owner OR collaborator
    const designs = await Design.find({
      $or: [
        { userId },
        { collaborators: userId }
      ]
    })
      .sort({ lastUpdated: -1 })
      .limit(10);

    console.log(userId, designs);
    res.json(designs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch designs" });
  }
});

// POST — create a new design
router.post("/", async (req, res) => {
  const {userId} = req.auth();  
  const { title, data } = req.body;

  try {
    const existingDesigns = await Design.find({ userId }).sort({ lastUpdated: -1 });
    if (existingDesigns.length >= 10) {
      const oldest = existingDesigns[existingDesigns.length - 1];
      await Design.findByIdAndDelete(oldest._id);
    }

    const newDesign = await Design.create({ userId, title, data });
    res.json(newDesign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create design" });
  }
});

// PUT — update an existing design
router.put("/:id", async (req, res) => {
  const {userId} = req.auth();  // verified Clerk user
  const { id } = req.params;
  const { title, data } = req.body;

  console.log(userId +  "  "+ id +  " "+ title);

  try {
    // Ensure the user owns this design
    const design = await Design.findOne({ _id: id, userId });
    if (!design) return res.status(403).json({ error: "Not authorized to update this design" });

    design.title = title;
    design.data = data;
    design.lastUpdated = new Date();
    await design.save();
    console.log(userId +  "  "+design);
    res.json(design);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update design" });
  }
});

// POST — add a collaborator
router.post("/:id/collaborators", async (req, res) => {
  const { userId } = req.auth(); 
  const { id } = req.params;
  const { email } = req.body;

  try {
    const design = await Design.findById(id);
    if (!design) return res.status(404).json({ error: "Design not found" });

    // Only the creator (owner) can add collaborators
    if (design.userId !== userId) return res.status(403).json({ error: "Not authorized" });

    // Lookup collaborator userId from Clerk by email using server SDK
    const users = await clerk.users.getUserList({ emailAddress: [email] });
    if (!users || users.length === 0) return res.status(404).json({ error: "User not found" });

    const collaboratorId = users[0].id;

    // Add collaborator if not already present
    if (!design.collaborators.includes(collaboratorId)) {
      design.collaborators.push(collaboratorId);
      await design.save();
    }

    res.json({ message: "Collaborator added!", design });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add collaborator" });
  }
});



module.exports = router;
