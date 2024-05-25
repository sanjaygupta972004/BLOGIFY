import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const isAdmin = AsyncHandler(async (req, _, next) => {
    try {
        const user = req.user; 
        if (!user ||!user.isAdmin) {
            return next(new ApiError(403, 'You are not authorized to access this route'));
        }
        next();
    
 } catch (error) {
        return next(new ApiError(401, 'something went wrong,while isAdmin middleware'));
 }
})