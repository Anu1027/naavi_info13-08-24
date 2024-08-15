// models.js

const mongoose = require('mongoose');

// Define a schema and model for emails
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = {
  Email
};
