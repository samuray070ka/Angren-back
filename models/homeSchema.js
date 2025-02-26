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
  our_history: [{
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
  events: [{
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
  directions: [{
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
  leaderships: [{
    img: String,
    name: String,
    direction: String,
  }],
});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;