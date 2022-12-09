const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        minLength: 8
    },
    hashPassword: {
        type: String,
        required: true,
        min: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactInfo: {
        type: String
    },
    profilePic: {
        type: String
    }
}, { timestamps: true });

userSchema.virtual('fullName')
.get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('password')
.set(function(password) {
    this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hashPassword);
    }
}

module.exports = mongoose.model('Users', userSchema);