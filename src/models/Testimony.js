const mongoose = require('mongoose');
const { Schema } = mongoose;


const TestimonySchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments:[
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    prayer: {
        type: Schema.Types.ObjectId,
        ref: 'prayers'
    }
})

const Testimony = mongoose.model('Testimony', TestimonySchema);

module.exports = Testimony;