const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Home = require('../models/homeSchema');

// Multerni public papkasida saqlaydigan qilib sozlash
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads') // bu papka project papkasida yaratilinadi
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Add timestamp to filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Not an image! Please upload an image.'), false)
    }
  }
});

// Admin uchun ma'lumotlarni saqlash
router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { section, title_uz, desc_uz, number } = req.body;

    if (!section || !req.file || (section !== 'results' && (!title_uz || !desc_uz))) {
      return res.status(400).json({ message: 'Iltimos, barcha maydonlarni to\'ldiring!' });
    }

    let homeData = await Home.findOne();
    if (!homeData) {
      homeData = new Home({
        banner: [],
        about: [],
        results: [],
        news: [],
      });
    }

    // Fileni base64 formatida saqlashni o'rniga, faylni public papkasida saqlash va mongodbga file joylashuvini saqlash.
    const newSection = {
      img: `${req.file.filename}`, // Rasm faylining joylashuvi saqlanmoqda
    };

    if (section === 'results') {
      newSection.number = number;
    } else {
      newSection.title = { uz: title_uz};
      newSection.description = { uz: desc_uz};
    }
    if (homeData[section]) {
      homeData[section].push(newSection); // Rasm saqlangan yangi section qo'shilmoqda
    } else {
      let model;
      switch (section) {
        case 'news':
          model = News;
          break;
        default:
          return res.status(400).json({ message: `Noto'g'ri section: ${section}` });
      }
      const newItem = new model(newSection);
      await newItem.save(); // Yangi ma'lumotlar saqlanmoqda, shu jumladan rasm joylashuvi
    }

    if (homeData[section]) {
      const savedData = await homeData.save();
      return res.json({ message: 'Ma’lumotlar saqlandi', data: savedData });
    } else {
      return res.json({ message: 'Ma’lumotlar saqlandi' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Server xatosi',
      details: error.message
    });
  }
});

module.exports = router;