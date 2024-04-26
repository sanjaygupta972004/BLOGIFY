import { AsyncHandler } from '../utils/AsyncHandler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { validateEmail,validatePassword } from '../validators/user.validator.js'

const signIn = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) {
        throw new ApiError(400,'Please provide name, email and password')
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
        name : name,
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

export {
    signIn
}






