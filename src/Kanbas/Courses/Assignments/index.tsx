import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPlus, FaSearch } from 'react-icons/fa';

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <div className="input-group">
                <span className="input-group-text">
                    <FaSearch />

                    <input id="wd-search-assignment"
                        placeholder="Search..." />

                </span>
            </div>
            <div className="right-justify">
                <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary mt-1 text-start">
                    <FaPlus className="me-2 fs-5" /> Group
                </button>
                <button id="wd-add-assignment" className="btn btn-lg btn-danger mt-1 text-start">
                    <FaPlus className="me-2 fs-5" /> Assignment
                </button>
            </div>

            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <h3 id="wd-assignments-title">
                            ASSIGNMENTS <span /> 40% of Total <button className="btn p-0"><FaPlus /></button>
                        </h3>
                    </div>
                    <ul id="wd-assignment-list" className="wd-lessons list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-5">
                            <a className="wd-assignment-link"
                                href="#/Kanbas/Courses/1234/Assignments/123">
                                A1 - ENV + HTML
                            </a>
                            <br />Multiple Modules | <b>Not available until </b> May 6 at 12:00am |<br />
                            <b>Due</b> May 13 at 11:59pm | 100 pts
                            <LessonControlButtons /></li>
                        <li className="wd-lesson list-group-item p-3 ps-5">
                            <a className="wd-assignment-link"
                                href="#/Kanbas/Courses/1234/Assignments/123">
                                A2 - CSS + BOOTSTRAP
                            </a>
                            <br />Multiple Modules | <b>Not available until </b> May 13 at 12:00am |<br />
                            <b>Due</b> May 20 at 11:59pm | 100 pts
                            <LessonControlButtons /></li>
                        <li className="wd-lesson list-group-item p-3 ps-5">
                            <a className="wd-assignment-link"
                                href="#/Kanbas/Courses/1234/Assignments/123">
                                A3 - JAVASCRIPT + REACT
                            </a>
                            <br />Multiple Modules | <b>Not available until </b> May 20 at 12:00am |<br />
                            <b>Due</b> May 27 at 11:59pm | 100 pts
                            <LessonControlButtons /></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
