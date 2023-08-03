const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
// Import models
const PasswordCheckResult = require('./models/PasswordCheckResult');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define MongoDB schema and model
const ResultSchema = new mongoose.Schema({
  password: String,
  steps: Number,
});

const Result = mongoose.model('Result', ResultSchema);

// API routes
app.post('/api/results', async (req, res) => {
  const { password, steps } = req.body;
  const result = new Result({ password, steps });

  try {
    const savedResult = await result.save();
    res.status(201).send('Result saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving result');
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find({});
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching results');
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
