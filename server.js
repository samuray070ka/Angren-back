const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path'); // path modulini qo'shing

dotenv.config();

const app = express();
app.use(express.json()); // JSON ma'lumotlarini o'qish uchun
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Add this after your other middleware
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); 
});
const corsOptions = {
    origin: '*', // Allows all origins
    methods: 'GET,POST,PUT,DELETE', // Allows specific methods
    allowedHeaders: 'Content-Type,Authorization' // Allows specific headers
};

app.use(cors(corsOptions));
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => {
    const PORT = process.env.PORT || 5001; 
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishlayapti...`);
    });
  })
  .catch((err) => console.log(err));

// Asosiy route
app.get("/", (req, res) => {
  res.send("Backend ishlayapti!");
});

// Admin route'ini ulash
const adminRoutes = require("./routes/admin");
// Update the admin route registration to log when it's mounted
app.use("/admin", (req, res, next) => { 
  console.log('👉 Admin route accessed');
  adminRoutes(req, res, next);
});
// const contactRoutes = require("./routes/contact");
// app.post("/texnikum-turizm/contact", contactRoutes);
// Boshqa route'lar
const homeRoutes = require("./routes/home");
app.use("/texnikum-turizm/home", homeRoutes);  // home.js faylini chaqirish

const loginRoutes = require("./routes/login");
app.post("/login", loginRoutes);