const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// READ ALL
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("GET ALL ERROR: ", err);
    res.status(500).json({ message: error.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch {
    console.log("GET ONE ERROR: ", err);
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("CREATE ERROR: ", err);
    res.status(400).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log("UPDATE ERROR: ", err);
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.log("DELETE ERROR: ", err);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
