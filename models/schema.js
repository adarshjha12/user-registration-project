const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            unique: [true, 'email already exists']
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
        },
        tokens: [{
            token:{
                type: String,
                required: true
            }
        }]
})
userSchema.methods.generateToken = async function (params) {
    try {
        console.log('id', this.id);
        
        const token = jwt.sign({id: this._id}, 'thisisasecretkeytosecurethewebsite')
        this.tokens = this.tokens.concat({token: token})
        console.log(this.tokens);
        await this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}

// adding security in password by hashing

userSchema.pre('save', async function (next) {
    // console.log(`password is ${this.password}`);
    
    if (this.isModified('password' || this.isNew)) {
        try {
            this.password = await bcrypt.hash(this.password, 10)
            // console.log(`password is ${this.password}`);

            this.confirmPassword = undefined
            next()
        } catch (error) {
            next(error)
        }
    } else{
       return next()
    }
})


const UserCollection = mongoose.model('UserCollection', userSchema)

module.exports = UserCollection