const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const covidRoutes = require('./routes/covidRoutes');

// MongoDB connection (Direct connection without .env)
const mongoURI = 'mongodb+srv://vedp7952:Ved32803@cluster0.x9dxn.mongodb.net/';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/covid', covidRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
