// models/PasswordCheckResult.js
const mongoose = require('mongoose');

const passwordCheckResultSchema = new mongoose.Schema({
  password: String,
  steps: Number,
});

const PasswordCheckResult = mongoose.model(
  'PasswordCheckResult',
  passwordCheckResultSchema
);

module.exports = PasswordCheckResult;
