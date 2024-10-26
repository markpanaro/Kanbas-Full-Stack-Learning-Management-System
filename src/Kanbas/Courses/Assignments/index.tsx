import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPlus, FaSearch } from 'react-icons/fa';
import ProtectedAdminRoute from "../../Account/ProtectedAdminRoute"
import * as db from "../../Database";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { useState } from "react";

export default function Assignments() {

    const { cid } = useParams();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    let [deleteWindow, setDeleteWindow] = useState(false);
    let [deleteId, setDeleteId] = useState("");
    {/*const assignments = db.assignments;*/ }

    interface Assignment {
        _id: string;
        title: string;
        course: string;
        available: string;
        due: string;
        points: number; // Assuming points should be a number
        available_raw: string;
        due_raw: string;
        description: string;
    }



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
                <ProtectedAdminRoute>
                    <button id="wd-add-assignment" className="btn btn-lg btn-danger mt-1 text-start"
                        onClick={() => {
                            window.location.href = `#/Kanbas/Courses/${cid}/Assignments/new`;
                        }}>
                        <FaPlus className="me-2 fs-5" /> Assignment
                    </button>
                </ProtectedAdminRoute>
            </div>

            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <h3 id="wd-assignments-title">
                            <div className="d-flex justify-content-between">
                                ASSIGNMENTS <div className="right-justify"> 40% of Total <button className="btn p-0"><FaPlus /></button></div>
                            </div>
                        </h3>
                    </div>
                    <ul id="wd-assignment-list" className="wd-lessons list-group rounded-0">

                        {assignments
                            .filter((module: any) => module.course === cid)
                            .map((assignment: Assignment) => (
                                <li className="wd-lesson list-group-item p-3 ps-5">
                                    <a className="wd-assignment-link"
                                        href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                                        {assignment.title}
                                    </a>
                                    <br /><span className="red-text">Multiple Modules</span> | <b>Not available until </b> {assignment.available || assignment.available_raw.toString()} |<br />
                                    <b>Due</b> {assignment.due || assignment.due_raw.toString()} | {assignment.points} pts


                                    <div className="float-end">
                                        <ProtectedAdminRoute>
                                            <FaPencil onClick={() =>
                                                window.location.href = `#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}
                                                className="text-primary me-3" />
                                            {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => dispatch(deleteAssignment(assignment._id))} /> */}
                                            <FaTrash className="text-danger me-2 mb-1" onClick={() => { setDeleteWindow(true); setDeleteId(assignment._id); }} />


                                        </ProtectedAdminRoute>
                                        <GreenCheckmark />
                                        <IoEllipsisVertical className="fs-4" />
                                    </div>
                                    {deleteWindow && assignment._id === deleteId && (
                                        <div className="confirmation-dialog">
                                            <p>Are you sure you want to delete this assignment?</p>
                                            <button onClick={() => dispatch(deleteAssignment(assignment._id))}>Yes</button>
                                            <button onClick={() => setDeleteWindow(false)}>No</button>
                                        </div>
                                    )}

                                    { /*LessonControlButtons  /> */}  </li>



                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
