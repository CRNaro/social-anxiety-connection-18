const { Schema, model, Types } = require('mongoose');
const dateUtils = require('../utils/dateUtils');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateUtils.dateFormat(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
}
});

module.exports = ReactionSchema;