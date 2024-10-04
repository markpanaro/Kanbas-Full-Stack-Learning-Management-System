import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input placeholder="username"
                className="form-control mb-2" /><br />
            <input placeholder="password" type="password"
                className="form-control mb-2" /><br />
            <input placeholder="verify password"
                className="form-control mb-2" type="password" /><br />
            <Link id="wd-signin-btn"
                to="/Kanbas/Account/Profile"
                className="btn btn-primary w-100">
                Sign in </Link><br />
            <Link to="/Kanbas/Account/Signin" >Sign in</Link>
        </div>
    );
}
