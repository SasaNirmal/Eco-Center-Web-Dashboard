// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const dashboardRoutes = require('./routes/dashboardRoutes');
const orderRoutes = require('./routes/orderRoutes');
const vegetableRoutes = require('./routes/vegetableRoutes');
const driversRoute = require('./routes/driverRoutes');
const nortificationRoute = require('./routes/nortificationRoutes');
const ordernortificationRoute = require('./routes/ordernortificationRoutes'); // Ensure correct route import

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// Directory setup for file uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route setup
app.use('/api/vegetables', vegetableRoutes(upload));
app.use('/api/admin', adminRoutes);
app.use('/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/drivers', driversRoute);
app.use('/api/nortification', nortificationRoute);
app.use('/api/ordernortification', ordernortificationRoute); // Use the correct route here

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
