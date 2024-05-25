import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AsyncHandler} from '../utils/AsyncHandler.js';

export const jwtAuthVerify = AsyncHandler(async (req, _, next) => {
    try {
    const token = req.cookies.jwtToken || req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new ApiError(401, 'token is not valid or not provided'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
      
    if (!user) {
        return next(new ApiError(401, 'Unauthorized User'));
    }
    const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    };
        req.user = userData;
        next();
    
   } catch (error) {
     return next(new ApiError(401, 'something went wrong, while verifying token'));
   }
})



