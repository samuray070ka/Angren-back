const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  banner: [{
    img: String,
    title: String,
    description: String,
  }],
  about: [{
    img: String,
    title: String,
    description: String,
  }],
  results: [{
    img: String,
    number: Number,
  }],
  news: [{
    img: String, 
    title: String,
    description: String,
  }],
});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;