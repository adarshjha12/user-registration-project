const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        gender:{
            type: String,
            required: true
        },
        mobileNo:{
            type: Number,
            required: true,
            unique: true
        },
        dob:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        confirmPassword:{
            type: String,
            required: true
        }
})


const UserCollection = mongoose.model('UserCollection', userSchema)

module.exports = UserCollection