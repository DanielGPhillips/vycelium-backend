const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true
        }, 
        email: {
            type: String,
            unique: true,
            validate: v => { return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)},
            required: [true, 'Email is required']
        }, 
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true
        },
        dateCreated: String,
        profilePicture: String,
        profileBanner: String,
        primaryTag: String,
        primaryPlatform: String,
        primaryLanguage: String,
        about: String,
        followers: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'user'
            }
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        spores: [
            {
                type: Schema.Types.ObjectId,
                ref: 'spore'
            }
        ]
    },{
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

userSchema.virtual('followerCount').get(function () {
    return this.followers.length
});

userSchema.virtual('followingCount').get(function () {
    return this.following.count
});

const User = model('user', userSchema);
module.exports = User;