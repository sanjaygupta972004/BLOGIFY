
export const validateEmail = (email) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validatePassword = (password) => {
    const minLength = 6;

    // Regular expressions for different criteria
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[$@$!%*?&]/;
    
    if(password.length < minLength) {
        return "Password must be at least 6 characters long";
    }

    if(!uppercaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter";
    }

    if(!lowercaseRegex.test(password)) {
        return "Password must contain at least one lowercase letter";
    }

    if(!specialCharRegex.test(password)) {
        return "Password must contain at least one special character";
    }

    return true;
}