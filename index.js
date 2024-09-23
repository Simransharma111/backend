const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); 
const resetRoutes = require('./routes/resetRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Configure CORS
app.use(cors({
  origin: '*', // Frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Database connection error:', err));

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the backend API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reset', resetRoutes); // Make sure routes are prefixed properly
app.use('/api/contact', contactRoutes);

// Route to handle form submission with file upload
app.use('/api/rent-card', uploadRoutes);

// Fallback for all other routes (if needed)
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
