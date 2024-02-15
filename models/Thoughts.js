// Thoughts.js will be used as a post for the User to post their thoughts and ideas in
const { Schema, model, Types } = require('mongoose');

const thoughtsSchema = new Schema(
{
    thoughtsId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    thoughtsText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thought', thoughtsSchema);

module.exports = thoughtsSchema;