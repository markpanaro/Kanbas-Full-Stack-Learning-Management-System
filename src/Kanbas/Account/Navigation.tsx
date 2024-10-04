import { Link } from "react-router-dom";
export default function AccountNavigation() {
    return (
        <div id="wd-account-navigation">
            <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
                <Link id="wd-signin-link" to="/Kanbas/Account/Signin"
                    className="list-group-item active border border-0">Signin</Link>
                <Link id="wd-signup-link" to="/Kanbas/Account/Signup"
                    className="list-group-item text-danger border border-0">Signup</Link>
                <Link id="wd-profile-link" to="/Kanbas/Account/Profile"
                    className="list-group-item text-danger border border-0">Profile</Link>
            </div>

        </div>
    );
}
