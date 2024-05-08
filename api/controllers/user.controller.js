import { AsyncHandler } from '../utils/AsyncHandler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { validateEmail,validatePassword } from '../validators/user.validator.js'

const signUp = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password) {
        throw new ApiError(400,'Please provide username, email and password')
    }
    if(!validateEmail(email)) {
        throw new ApiError(400, 'Please provide a valid email')
    }
    if(validatePassword(password) !== true) {
        throw new ApiError(400, validatePassword(password))
    }
    const preUser = await User.findOne({ email })
    if(preUser) {
        throw new ApiError(400, 'User already exists')
    }

    const user = await User.create({
        username : username,
        email : email,
        password : password
    })

    const userData = {
        id : user._id,
        name : user.name,
        email : user.email
    }
     
    return res
        .status(201)
        .json(new ApiResponse(201, userData, 'User created successfully'))
})


const signIn = AsyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password || email === '' || password === '') {
        throw new ApiError(400, 'Please provide email and password')
    }
    if(!validateEmail(email)) {
        throw new ApiError(400, 'Please provide a valid email')
    }
    const user = await User.findOne({ email })
    if(!user) {
        throw new ApiError(404, 'User is not registered with this email')
    }
    const isMatch = await user.isCorrectPassword(password)
    if(!isMatch) {
        throw new ApiError(401, 'Invalid credentials')
    }
    const token = user.accessTokenGenerator()
    const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    return res
        .status(200)
        .cookie('jwtToken', token, options)
        .json(new ApiResponse(200, {
            token,
            user:user
        }, 'User signed in successfully'))
})

const signInWithGoogle = AsyncHandler(async (req, res) => {
    const { username, email, password,profileImage } = req.body
    if(!username || !email || !password || username === '' || email === '' || password === '') {
        throw new ApiError(400,'Please provide username, email and password')
    }
    if(!validateEmail(email)) {
        throw new ApiError(400, 'Please provide a valid email')
    }
    const correctPassword = "@" + password
    if(validatePassword(correctPassword) !== true) {
        throw new ApiError(400, validatePassword(correctPassword))
    }
    const preUser = await User.findOne({ email })
    if(preUser) {
        const token = preUser.accessTokenGenerator()
        const options = {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        return res
            .status(200)
            .cookie('jwtToken', token, options)
            .json(new ApiResponse(200, {
                token,
                user:preUser
            }, 'User signed in with google successfully'))
    }

    const user = await User.create({
        username : username,
        email : email,
        password: correctPassword,
        profileImage: profileImage
        
    })

    const userData = {
        id : user._id,
        name : user.name,
        email: user.email,
        profileImage: user.profileImage
    }
     
    return res
        .status(201)
        .json(new ApiResponse(201, userData, 'User signUp with google successfully'))
})

export {
    signUp,
    signIn,
    signInWithGoogle
}






