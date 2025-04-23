const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/static/images", express.static("static/images"));

// In-memory clothes dataset
let clothes = [
  { id: 1, title: "Vintage Denim Jacket", description: "Classic blue denim jacket with a worn-in look.", size: "M", price: 35, category: "Jackets", seller: "Emma Green", location: "New York", imageUrl: "/static/images/item_1.png" },
  { id: 2, title: "Red Flannel Shirt", description: "Warm and cozy red flannel shirt.", size: "L", price: 20, category: "Shirts", seller: "James Carter", location: "Chicago", imageUrl: "/static/images/item_2.png" },
  { id: 3, title: "Green Hoodie", description: "Soft cotton hoodie with adjustable hood.", size: "S", price: 25, category: "Sweaters", seller: "Sophia Lee", location: "Los Angeles", imageUrl: "/static/images/item_3.png" },
  { id: 4, title: "Black Leather Jacket", description: "Stylish black leather jacket with zip-up front.", size: "M", price: 50, category: "Jackets", seller: "Daniel Brown", location: "Houston", imageUrl: "/static/images/item_4.png" },
  { id: 5, title: "White Cotton T-Shirt", description: "Basic white cotton t-shirt for everyday wear.", size: "L", price: 10, category: "T-Shirts", seller: "Olivia Martinez", location: "Miami", imageUrl: "/static/images/item_5.png" },
  { id: 6, title: "Brown Wool Sweater", description: "Cozy wool sweater in a warm brown color.", size: "XL", price: 40, category: "Sweaters", seller: "Liam Johnson", location: "Seattle", imageUrl: "/static/images/item_6.png" },
  { id: 7, title: "Blue Denim Jeans", description: "Classic straight-leg blue denim jeans.", size: "M", price: 30, category: "Jeans", seller: "Mia Anderson", location: "Boston", imageUrl: "/static/images/item_7.png" },
  { id: 8, title: "Floral Summer Dress", description: "Lightweight summer dress with a floral print.", size: "S", price: 28, category: "Dresses", seller: "Charlotte White", location: "San Francisco", imageUrl: "/static/images/item_8.png" },
  { id: 9, title: "Gray Zip-Up Hoodie", description: "Comfortable gray hoodie with pockets.", size: "L", price: 22, category: "Sweaters", seller: "Noah Wilson", location: "Denver", imageUrl: "/static/images/item_9.png" },
  { id: 10, title: "Striped Long-Sleeve Shirt", description: "Stylish striped long-sleeve shirt.", size: "M", price: 18, category: "Shirts", seller: "Ava Thomas", location: "Austin", imageUrl: "/static/images/item_10.png" },
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/images'); // Gem billederne i 'static/images' mappen
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Giver billedet et unikt navn baseret på tidsstempel
  }
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single('image');

// Get all items
app.get("/clothes", (req, res) => {
  res.json(clothes);
});

// Search items
app.get('/clothes/search/:term', (req, res) => {
  const { term } = req.params;
  console.log("Searching for clothes matching:", term);
  const filtered = clothes.filter(item =>
    item.title.toLowerCase().includes(term.toLowerCase()) ||
    item.description.toLowerCase().includes(term.toLowerCase()) ||
    item.category.toLowerCase().includes(term.toLowerCase()) ||
    item.seller.toLowerCase().includes(term.toLowerCase())
  );
  res.json(filtered);
});

// Add new item
app.post("/clothes", upload.single('image'), (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);  // Log filen for at se, om uploaden virker

  const { title, description, size, price, category, seller, location } = req.body;

  // Tjek om alle nødvendige data er til stede og om der er uploadet et billede
  if (!title || !description || !size || !price || !category || !seller || !location || !req.file) {
    return res.status(400).json({ error: "All fields are required and an image must be uploaded" });
  }

  const newId = clothes.length + 1;
  const imageUrl = `/static/images/${req.file.filename}`;

  const newItem = {
    id: newId,
    title,
    description,
    size,
    price,
    category,
    seller,
    location,
    imageUrl
  };

  clothes.push(newItem); // Tilføj den nye vare til arrayet
  res.status(201).json(newItem); // Send den oprettede vare som svar
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

