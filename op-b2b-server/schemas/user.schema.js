const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(

    {
        name: String,
        user: String,
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
        lastAccess: Date,
        requester: String,
        reason: String
    },
    {
        collection: 'users_new'
    }

)

module.exports = { Mongoose: mongoose, UserSchema: userSchema }