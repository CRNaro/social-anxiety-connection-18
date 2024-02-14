const { Schema, model } = require('mongoose');


const ReactionSchema = new Schema({
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
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    thoughtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }
});

module.exports = model('Reaction', ReactionSchema);