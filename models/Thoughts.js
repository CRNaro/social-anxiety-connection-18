// Thoughts.js will be used as a post for the User to post their thoughts and ideas in
const { Schema, model, Types } = require('mongoose');

const thoughtsSchema = new Schema(
{
    // thoughtsId: {
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId()
    // },
    
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
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

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;  //  was thoughtsSchema