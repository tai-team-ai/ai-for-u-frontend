

interface validateSignUpProps {
    email: string
    password: string
    confirmPassword: string
}
export function validateSignUp({ email, password, confirmPassword }: validateSignUpProps) {
    const errors = [];
    if (!email) {
        errors.push("Email is a required field");
    }
    if (!validateEmail(email)) {
        errors.push("Invalid formated Email");
    }
    if (!password) {
        errors.push("Password is a required field")
    }
    if (!confirmPassword) {
        errors.push("Confirm Password is a required field");
    }
    if (password !== confirmPassword) {
        errors.push("password and confirm password must match")
    }
    if (password.length < 6) {
        errors.push("password must be at least 6 characters long")
    }
    if (password.toLowerCase() === password) {
        errors.push("password must be a mix of upper and lower case letters")
    }
    return errors;
}

export function validateEmail(email: string): boolean {
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validEmail) !== null;
}
