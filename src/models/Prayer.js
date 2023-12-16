const mongoose = require('mongoose');
const { Schema } = mongoose;


const PrayerSchema = new Schema({
    body: String,
    username: String,
    comments:[
        {
            body: String,
            username: String,
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    likes: [
        {
            username: String,
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        enum: ['answered', 'unanswered'],
        default: 'unanswered',
    },
},{
    timestamps: true,
  })

const Prayer = mongoose.model('Prayer', PrayerSchema);

module.exports = Prayer;