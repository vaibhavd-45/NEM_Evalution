const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const adminRoutes = require('./routes/adminRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

dotenv.config();
const app = express();
app.use(express.json());


connectDB();


app.use('/admin', adminRoutes);
app.use('/candidate', candidateRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});