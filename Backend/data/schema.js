const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    memeId: {type: Number, required: true},
    memeTitle: {type: String, required: true},
    image: String,
    likes: Number,
    comments: Array,
    tags: String
})

module.exports = mongoose.model("Meme", memeSchema) //Exporting model of the schema