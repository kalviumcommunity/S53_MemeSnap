const express = require('express');
const router = express.Router();
const Meme = require("../data/schema"); // Import your Meme schema

// Read data
router.get('/', async (req, res) => {
    try {
        const data = await Meme.find({});
        res.json({ msg: true, data: data });
    } catch (error) {
        res.status(500).json({ msg: false, error: error.message });
    }
});

// Create data
router.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        const data = new Meme(req.body);
        await data.save();
        res.send({ msg: true, message: "data saved successfully" });
    } catch (error) {
        res.status(500).json({ msg: false, error: error.message });
    }
});

// Update data
router.put("/update/:postId", async (req, res) => {
    try {
        let postId = req.params.postId;
        let newData = req.body.Title;
        const data = await Meme.findOneAndUpdate({ postId: postId }, { Title: newData });
        res.send({ msg: true, message: "data updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: false, error: error.message });
    }
});

// Delete data
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const data = await Meme.deleteOne({ _id: id });
        res.send({ msg: true, message: "data deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: false, error: error.message });
    }
});

module.exports = router;
