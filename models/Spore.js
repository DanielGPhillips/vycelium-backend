const { model, Schema } = require('mongoose');

const  cheerSchema = new Schema ({});
const  cringeSchema = new Schema ({});

const sporeSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        sporeText: {
            type: String,
            maxlength: 280
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comment'
            }
        ],
        cheers: [{ cheerSchema }],
        cringes: [{ cringeSchema }]
    },{
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

sporeSchema.virtual('commentCount').get(function() {
    return this.comments.length
});

sporeSchema.virtual('cheerCount').get(function() {
    return this.cheers.length
});

sporeSchema.virtual('cringeCount').get(function() {
    return this.cringes.length
});

const Spore = model('spore', sporeSchema);
module.exports = Spore;