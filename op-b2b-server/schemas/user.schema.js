const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(

    {
        userId: String,
        name: String,
        company: String,
        typeUser: String,
        password: String,
        creationDate: Date,
        status: String,
        email: String,
        uf: String,
        nickName: String,
        avatar: String,
        department: String,
        lastLogin: Date,
        requester: String,
        reason: String
    },
    {
        collection: 'users_new'
    }

)

module.exports = { Mongoose: mongoose, UserSchema: userSchema }