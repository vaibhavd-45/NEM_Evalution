const User = require('../models/User');
const Job = require('../models/Job');
const nodemailer = require('nodemailer');


exports.signup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });


    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(200).json({ token });
};


exports.viewJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            requiredSkills: { $in: req.user.skills }
        });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });


        job.applicants.push(req.user._id);
        await job.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.user.username,
            subject: 'Job Application Confirmation',
            text: `You have successfully applied for the job: ${job.title}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
            console.log('Email sent: ' + info.response);
        });


        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.withdrawApplication = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });


        job.applicants.pull(req.user._id);
        await job.save();
        res.status(200).json({ message: 'Application withdrawn successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};