const Job = require('../models/Job');


exports.createJob = async (req, res) => {
    try {
        const job = new Job({ ...req.body, createdBy: req.user._id });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user._id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};