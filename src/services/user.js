const jwt = require('jsonwebtoken')
const User = require('../models/user')

// User signup
const userSignup = async (object) => {
    const user = new User(object)
    await user.save()
}

// User login
const userLogin = async (object) => {
    const user = await User.findByCredentials(object.email, object.password)
    const token = await user.generateAuthToken()

    return { user, token }
}

// User logout
const userLogout = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    user.tokens = user.tokens.filter((tokenFiltered) => {
        return tokenFiltered.token !== token
    })

    await user.save()
}

module.exports = {
    userSignup,
    userLogin,
    userLogout
}