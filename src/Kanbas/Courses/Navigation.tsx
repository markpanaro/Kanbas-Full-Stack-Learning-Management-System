import { Link, useParams, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { courses } from "../Database";

export default function CoursesNavigation() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];


    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link id="wd-course-item-link" key={link} to={`/Kanbas/Courses/${cid}/${link}`}
                    className={`list-group-item border border-0 ${pathname.includes(link) ? "active text-black" : "text-danger"}`}>
                    {link}

                </Link>
            ))}
        </div>
    );
}


