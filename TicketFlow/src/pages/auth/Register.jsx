import { Link } from "react-router";

export function Register() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <h1 className="text-center mb-4">Register</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name Surname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Your Name Surname"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Your Name Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Your Name Password"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordConfirm" className="form-label">Password Again</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordConfirm"
                                    placeholder="Enter Your Name Password Again"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
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