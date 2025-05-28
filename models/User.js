const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'candidate'], required: true },
    skills: { type: [String], required: function() { return this.role === 'candidate'; } }
});

module.exports = mongoose.model('User', userSchema);