const mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true})

var userSchema = new Schema({
    userName: String,
    password: String
})

exports.registerUser = async function (name, pw) {
    var UserModel = mongoose.model('User', userSchema)

    const user = new UserModel({ userName: name, password: pw})
    
    await user.save()
}

exports.findUser = async function(name) {
    var UserModel = mongoose.model('User', userSchema)

    return await UserModel.findOne({userName: name})
}

exports.getUsersList = async function () {
    var UserModel = mongoose.model('User', userSchema)

    return await UserModel.find();
}
