const validator = require('validator')

module.exports.signup = (email, password) => {
	const errors = {};
	if (email === ''){
		errors["error"] = "Email cannot be blank";
		}
	if (!validator.isEmail(email)){
		errors["error"] = "Not a valid email address";
		}
	if(password === ''){
		errors["error"] = "Password cannot be blank"
	}
	if(!validator.isAscii(password)){
		errors["error"] = "Not a valid password";	
		}
	if(!validator.isLength(password, { min:4, max: 20 })){
		errors["error"] = "Ensure that your password has a minimum of 4 characters and maximum of 20 characters";	
	}
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}
module.exports.reset_password_validator = (password) => {
	const errors = {};
	if(password === ''){
		errors["password"] = "Password cannot be blank"
	}
	if(!validator.isAscii(password)){
		errors["password"] = "Not a valid password";	
		}
	if(!validator.isLength(password, {min:4, max: 20})){
		errors["password"] = "Ensure that your password has a minimum of 4 characters and maximum of 20 characters";	
	}
	return{
		errors,
		valid: Object.keys(errors).length < 1
	}
}

module.exports.create_post = (title, body) => {
	const errors = {};
	if(title === ''){
		errors["error"] = "Title cannot be blank"
	}
	if(!validator.isLength(title, {min:4, max: 35})){
		errors["error"] = "Ensure that your title has a minimum of 4 characters and maximum of 35 characters";	
	}
	return{
		errors,
		valid: Object.keys(errors).length < 1
	}
}