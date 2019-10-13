const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  regNo: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
