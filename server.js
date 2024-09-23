const express= require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const authRoutes=require('./routes/authRoutes');
// const { registerUser, loginUser } = require('./controllers/authController');
const uploadRoutes = require('./routes/uploadRoutes'); // Ensure this path is correct
const resetRoutes = require('./routes/resetRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(cors({
  origin: 'https://frontend-psi-navy.vercel.app', // Replace with the actual URL of your frontend
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

// Routes
// app.post('/register', registerUser);
// app.post('/login', loginUser);
app.use('/api/auth', authRoutes);
app.use('/api', resetRoutes);
app.use('/api', contactRoutes);


// Route to handle form submission with file upload
app.use('/api/rent-card', uploadRoutes);
// app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
  // app.get('/api/rent-card', uploadRoutes);
  // app.get('/user/:userId',uploadRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});