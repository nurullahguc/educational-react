import { useState } from "react";
import { Link } from "react-router";
import { generateRandom, handleHttpError, ToastMessage } from "../../utils/general";
import { useAuth } from "../../hooks/useAuth";

export function Register() {
    const [name, setName] = useState(() => {
        return `test${generateRandom(0, 100)} test`
    });
    const [email, setEmail] = useState(() => {
        return `test${generateRandom(0, 100)}@test.com`
    });
    const [password, setPassword] = useState("password123");
    const [passwordAgain, setPasswordAgain] = useState("password123");
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [passwordAgainTouched, setPasswordAgainTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const nameValidation = {
        status: !nameTouched || name.trim() !== "",
        message: nameTouched && name.trim() === "" ? "Enter your name!" : ""
    }
    const emailValidation = {
        status: !emailTouched || email.trim() !== "",
        message: emailTouched && email.trim() === "" ? "Enter your email!" : ""
    }
    const passwordValidation = {
        status: !passwordTouched || password.trim() !== "",
        message: passwordTouched && password.trim() === "" ? "Enter your password!" : ""
    }
    const isPasswordMatching = password.trim() === passwordAgain.trim();
    const isPasswordAgainEmpty = passwordAgain.trim() === "";
    const passwordAgainValidation = {
        status: !passwordAgainTouched || (!isPasswordAgainEmpty && isPasswordMatching),
        message: passwordAgainTouched && (isPasswordAgainEmpty || !isPasswordMatching) ?
            "Please enter your password again and make sure your passwords match!" : "",
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) {
            ToastMessage("warning", "Please wait for panding transaction!");
            return false;
        }

        setNameTouched(true);
        setEmailTouched(true);
        setPasswordTouched(true);
        setPasswordAgainTouched(true);

        if (!name.trim()) {
            ToastMessage("error", "Error", "name is required!");
            return false;
        }
        if (!email.trim()) {
            ToastMessage("error", "Error", "Email is required!");
            return false;
        }
        if (!password.trim()) {
            ToastMessage("error", "Error", "Password is required!");
            return false;
        }
        if (!passwordAgain.trim()) {
            ToastMessage("error", "Error", "Password again is required!");
            return false;
        }

        ToastMessage('info', 'Request Sent!', 'Your login request has been sent, please wait for the transaction!');
        setIsLoading(true);
        try {
            const response = await register({
                name,
                email,
                password,
                password_confirmation: passwordAgain
            });
            ToastMessage("success", "Successful!", `Welcome ${response.name}`);
        } catch (e) {
            handleHttpError(e);
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <h1
                            className="text-center mb-4"
                        >Register</h1>
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="form-label"
                                >name</label>
                                <input
                                    type="text"
                                    className={`form-control ${nameValidation.status ? '' : 'is-invalid'}`}
                                    id="name"
                                    placeholder="Enter Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={() => setNameTouched(true)}
                                />
                                <div className="invalid-feedback">
                                    {nameValidation.message}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${emailValidation.status ? '' : 'is-invalid'}`}
                                    id="email"
                                    placeholder="Enter Your Name Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setEmailTouched(true)}
                                />
                                <div className="invalid-feedback">
                                    {emailValidation.message}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${passwordValidation.status ? '' : 'is-invalid'}`}
                                    id="password"
                                    placeholder="Enter Your Name Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => setPasswordTouched(true)}
                                />
                                <div className="invalid-feedback">
                                    {passwordValidation.message}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="passwordConfirm"
                                    className="form-label"
                                >Password Again</label>
                                <input
                                    type="password"
                                    className={`form-control ${passwordAgainValidation.status ? '' : 'is-invalid'}`}
                                    id="passwordConfirm"
                                    placeholder="Enter Your Name Password Again"
                                    value={passwordAgain}
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    onBlur={() => setPasswordAgainTouched(true)}
                                />
                                <div className="invalid-feedback">
                                    {passwordAgainValidation.message}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isLoading}
                            >Register</button>
                        </form>
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login">Sing in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}