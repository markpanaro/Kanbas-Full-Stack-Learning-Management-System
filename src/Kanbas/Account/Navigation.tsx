import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();

    const active = (path: string) => (pathname.includes(path) ? "active" : "");

    return (
        <div id="wd-account-navigation">
            <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
                {!currentUser && (
                    <>
                        <Link id="wd-signin-link" to="/Kanbas/Account/Signin"
                            className="list-group-item active border border-0">Signin</Link>
                        <Link id="wd-signup-link" to="/Kanbas/Account/Signup"
                            className="list-group-item text-danger border border-0">Signup</Link>
                    </>
                )}
                {currentUser && (
                    <Link id="wd-profile-link" to="/Kanbas/Account/Profile"
                        className="list-group-item text-danger border border-0">Profile</Link>
                )}
                {currentUser && currentUser.role === "ADMIN" && (
                    <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link>)}
            </div>

        </div>
    );
}
