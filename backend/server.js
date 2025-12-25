const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Import DB connection
const personnelRoutes = require('./routes/personnelRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/personnel', personnelRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});