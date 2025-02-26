const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'yourSecretKey';

// Middleware'lar
app.use(cors()); // CORS muammolarini oldini olish
app.use(bodyParser.json()); // JSON formatdagi so‘rovlarni o‘qish

// Statik foydalanuvchi ma’lumotlari
const users = [
  { 
    email: 'angren@gmail.com',
    password: 'password123', // Haqiqiy loyihada parolni shifrlash kerak 
  },
];

// ✅ **Login Route**
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Foydalanuvchini topish
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) { 
    return res.status(401).json({ error: 'Email yoki parol noto‘g‘ri' });
  } 

  // JWT token yaratish 
  const auth_token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ auth_token });
});

// Serverni ishga tushirish
module.exports = app;