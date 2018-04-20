const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Work', WorkSchema);