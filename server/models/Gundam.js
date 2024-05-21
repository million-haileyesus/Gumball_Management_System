// Gundam.js

const mongoose = require('mongoose');

const gundamSchema = new mongoose.Schema({
    ModelName: { type: String, required: true, unique: true },
    Grade: { type: String, required: true },
    Scale: { type: String, required: true },
    Progress: { type: String, required: true }
});

const Gundam = mongoose.model('Gundam', gundamSchema);

module.exports = Gundam;