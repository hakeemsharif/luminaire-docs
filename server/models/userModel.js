import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        
        lastName: {
            type: String,
            required: true
        }, 

        userName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },

        file: {
            type: String,
        },
    },
    
    {
        timestamps: true,
    }
);

// Static Signup Method
userSchema.statics.signup = async function (firstName, lastName, userName, email, password, role, file) {
    
    const exist = await this.findOne({ email })

    if (exist) {
        throw Error("Email already in user")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({firstName, lastName, userName, email, password: hash, role, file})

    return user
}

// Static Login Method
userSchema.statics.login = async function (email, password) {
    
    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Your username or password is incorrect") // Wrong Email
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Your username or password is incorrect") // Wrong Password
    }

    return user
}

export const User = mongoose.model('Users', userSchema);