//[Section] Activity
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'UserId is Required']
    },
    name: {
        type: String,
        required: [true, 'Workout Name is Required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is Required']
    },
    status: {
        type: String,
        required: [true, 'Status is Required'],
        default: 'pending'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema);
