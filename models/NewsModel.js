const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('NewsModel', NewsSchema);