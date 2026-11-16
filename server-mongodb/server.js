
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/closetCycleDB")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});

// Clothing Schema
const clothingSchema = new mongoose.Schema({
    name: String,
    category: String,
    type: String,
    price: Number,
    size: String,
    condition: String,
    image: String,
    description: String
});

const Clothing = mongoose.model("Clothing", clothingSchema);

// Test Route
app.get("/", (req, res) => {
    res.send("ClosetCycle API is Running!");
});

// CREATE - Add clothing
app.post("/clothing", async (req, res) => {
    try {
        const item = new Clothing(req.body);
        await item.save();

        res.json({
            message: "Clothing Item Added Successfully",
            item
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ - Display all clothing
app.get("/clothing", async (req, res) => {
    try {
        const items = await Clothing.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SEARCH - Search by name
app.get("/clothing/search/:name", async (req, res) => {
    try {
        const items = await Clothing.find({
            name: { $regex: req.params.name, $options: "i" }
        });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE - Edit clothing
app.put("/clothing/:id", async (req, res) => {
    try {
        const item = await Clothing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({ message: "Item Not Found" });
        }

        res.json({
            message: "Clothing Item Updated Successfully",
            item
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove clothing
app.delete("/clothing/:id", async (req, res) => {
    try {
        const item = await Clothing.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item Not Found" });
        }

        res.json({ message: "Clothing Item Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server Running on Port 3001");
});
