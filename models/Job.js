const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }
});


module.exports = mongoose.model('Job', jobSchema);