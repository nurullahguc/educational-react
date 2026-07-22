import { useState } from "react";
import { Link } from "react-router";
import { handleHttpError, ToastMessage } from "../../utils/general";
import { login } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
    const [email, setEmail] = useState("nurullah@example.com");
    const [password, setPassword] = useState("password123");
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const emailValidation = {
        status: !emailTouched || email.trim() !== "",
        message: emailTouched && email.trim() === "" ? "Provide an email!" : ""
    };
    const passwordValidation = {
        status: !passwordTouched || password.trim() !== "",
        message: passwordTouched && password.trim() === "" ? "Enter your password!" : ""
    };

    const handleLoginButton = async (event) => {
        event.preventDefault();

        if (isLoading) {
            ToastMessage('warning', 'Warning', 'Please wait for pending transaction..');
            return false;
        }

        setEmailTouched(true);
        setPasswordTouched(true);
        if (!email.trim()) {
            ToastMessage('error', 'Error', 'Provide an Email!');
            return false;
        }
        if (!password.trim()) {
            ToastMessage('error', 'Error', 'Enter your password!');
            return false;
        }

        try {
            ToastMessage('info', 'Request Sent!', 'Your login request has been sent, please wait for the transaction!');
            setIsLoading(true);

            await login({
                email,
                password
            });

            ToastMessage("success", "Successful!", "Welcome!");
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
                        <h1 className="text-center mb-4">Login</h1>
                        <form onSubmit={handleLoginButton}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email adresinizi giriniz"
                                    value={email}
                                    className={`form-control ${!emailValidation.status ? 'is-invalid' : ''}`}
                                    onChange={handleOnChangeEmail}
                                    onBlur={() => setEmailTouched(true)}
                                />
                                <div className="invalid-feedback">
                                    {emailValidation.message}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Şifrenizi giriniz"
                                    value={password}
                                    onChange={handleOnChangePassword}
                                    className={`form-control ${!passwordValidation.status ? 'is-invalid' : ''}`}
                                    onBlur={() => setPasswordTouched(true)}
                                />
                                <div className="invalid-feedback">
                                    {passwordValidation.message}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isLoading}
                            >Giriş Yap</button>
                        </form>
                        <p className="text-center mt-3">
                            Don't You Have an Account? <Link to="/register">Sign Up Now.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}