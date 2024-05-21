import { AsyncHandler } from '../utils/AsyncHandler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { validateEmail,validatePassword } from '../validators/user.validator.js'
import { isValidObjectId } from 'mongoose'

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
        password: password,

    })

    const userData = {
        id : user._id,
        username : user.username,
        email: user.email,
        profileImage: user.profileImage
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
        throw new ApiError(401, 'Invalid password provided ')
    }
    const token = user.accessTokenGenerator()
    const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    const userData = {
        id : user._id,
        username : user.username,
        email: user.email,
        profileImage: user.profileImage
    }
    return res
        .status(200)
        .cookie('jwtToken', token, options)
        .json(new ApiResponse(200, {
            token,
            user:userData
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
        const userData = {
            id : preUser._id,
            username : preUser.username,
            email: preUser.email,
            profileImage: preUser.profileImage
        }
        return res
            .status(200)
            .cookie('jwtToken', token, options)
            .json(new ApiResponse(200, {
                token,
                user: userData 
            }
            , 'User signed in with google successfully'))
    }

    const user = await User.create({
        username : username.toLowerCase().trim(),
        email : email,
        password: correctPassword,
        profileImage: profileImage
        
    })

    const token = user.accessTokenGenerator()
    const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }


    const userData = {
        id : user._id,
        username : user.username,
        email: user.email,
        profileImage: user.profileImage
    }
     
    return res
        .status(201)
        .cookie('jwtToken', token, options)
        .json(new ApiResponse(201, {
            token,
            user: userData
         }, 'User signUp with google successfully'))
})

const signOut = AsyncHandler(async (req, res) => { 
    if (!req.user) {
        throw new ApiError(400, 'You are not signed in pls sign in first')
    }
    return res
        .status(200)
        .clearCookie('jwtToken')
        .json(new ApiResponse(200, {}, 'User signed out successfully'))
})


const updateProfileImage = AsyncHandler(async (req, res) => {
    const { profileImage } = req.body
    const { userId } = req.params
    if (!profileImage || profileImage === '') {
        throw new ApiError(400, 'Please provide profile image')
    }
    const { id } = req.user
    const user = await User.findById(userId).select("-password ")
    if (!user) {
        throw new ApiError(404, 'User is not found')
    }
    if(!isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid user id')
    }
    if (id.toString() !== userId.toString()) {
        throw new ApiError(403, 'You are not authorized to update profile image this user')
    }

    user.profileImage = profileImage
    await user.save()
    const updatedUserData = {
        id : user._id,
        username : user.username,
        email: user.email,
        profileImage: user.profileImage
    }
    return res
        .status(200)
        .json(new ApiResponse(200, {
            user: updatedUserData
        }, 'Profile image updated successfully'))

})


const updateProfile = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    const { userId } = req.params
  
    if (!username.trim() || !email.trim() || !password.trim()) {
          throw new ApiError(400, 'Please provide username, email and password');
    }

    if (!validateEmail(email)) {
        throw new ApiError(400, 'Please provide a valid email')
    }
    if (!validatePassword(password)) {
        throw new ApiError(400, validatePassword(password))
    }
    const { id } = req.user
    
    if(!isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid user id')
    }

    if(id.toString() !== userId.toString()) {
        throw new ApiError(403, 'You are not authorized to updateProfile this user')
    }
    const user = await User.findById(userId)
    if(!user) {
        throw new ApiError(404, 'User is not found')
    }

    const oldUser = await User.findOne({ email })
    if(oldUser ) {
        throw new ApiError(400, 'User already exists with this email')
    }

    user.username = username
    user.email = email
    user.password = password

    await user.save()
    
    const updatedUserData = {
        id : user._id,
        username : user.username,
        email: user.email,
        profileImage: user.profileImage
    }
  
   
    return res
        .status(200)
        .json(new ApiResponse(200, {user:updatedUserData}, 'User profile updated successfully'))
})


const deleteUser = AsyncHandler(async (req, res) => { 
    const { userId } = req.params
    const { id } = req.user
    const user = await User.findById(userId)
    if(!user) {
        throw new ApiError(404, 'User is not found')
    } 
    if(!isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid user id')
    }
    if(id.toString() !== userId.toString()) {
        throw new ApiError(403, 'You are not authorized to delete this user')
    }

    await User.deleteOne({
        _id: userId
    })
 
    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'User deleted successfully'))
})





export {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfileImage,
    updateProfile,
    deleteUser
}






