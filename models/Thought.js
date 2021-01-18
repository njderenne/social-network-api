const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]//add to this in future from reactionSchema
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

module.exports = Thought;