const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  password: String,
  steps: Number,
});

// Define a method to save the result
resultSchema.methods.saveResult = async function () {
  try {
    // Use 'this' to refer to the document instance
    await this.save();
    console.log('Result saved successfully');
  } catch (error) {
    console.error('Error saving result:', error);
  }
};

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
