const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  banner: [{
    img: String,
    title: {
      uz: String,
      ru: String,
      en: String,
    },
    description: {
      uz: String,
      ru: String,
      en: String,
    },
  }],
  about: [{
    img: String,
    title: {
      uz: String,
      ru: String,
      en: String,
    },
    description: {
      uz: String,
      ru: String,
      en: String,
    },
  }],
  results: [{
    img: String,
    number: Number,
  }],
  news: [{
    img: String, 
    title: {
      uz: String,
      ru: String,
      en: String,
    },
    description: {
      uz: String,
      ru: String,
      en: String, 
    },
  }],
});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;