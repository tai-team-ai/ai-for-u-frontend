

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
    if (!email.includes("@")) {
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
    return errors;
}
