// User model
const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property 