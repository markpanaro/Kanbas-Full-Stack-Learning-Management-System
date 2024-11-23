import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPlus, FaSearch } from 'react-icons/fa';
import ProtectedAdminRoute from "../../Account/ProtectedAdminRoute"
import * as db from "../../Database";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { setAssignments, deleteAssignment, addAssignment } from "../Assignments/reducer";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { useEffect, useState } from "react";
import * as coursesClient from "../../Courses/client"
//import * as assignmentsClient from "../Assignments/client"
import * as quizzesClient from "../Quizzes/client"
import { setQuizzes, deleteQuiz, addQuiz } from "../Quizzes/reducer";

export default function Quizzes() {

    const { cid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    let [deleteWindow, setDeleteWindow] = useState(false);
    let [deleteId, setDeleteId] = useState("");

    //let assignmentID = assignment.id;

    {/*const assignments = db.assignments;*/ }

    const removeQuiz = async (quizId: string) => {
        await quizzesClient.removeQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };


    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);


    return (
        <div id="wd-quizzes">
            <div className="input-group">
                <span className="input-group-text">
                    <FaSearch />

                    <input id="wd-search-quiz"
                        placeholder="Search for Quiz" />

                </span>
            </div>
            <div className="right-justify">
                <ProtectedAdminRoute>
                    <button id="wd-add-quiz" className="btn btn-lg btn-danger mt-1 text-start"
                        onClick={() => {
                            window.location.href = `#/Kanbas/Courses/${cid}/Quizzes/new`;
                        }}>
                        <FaPlus className="me-2 fs-5" /> Quiz
                    </button>
                    <button id="wd-add-quiz-group" className="btn btn-lg btn-secondary mt-1 text-start">
                        <div className="me-2 fs-5" /> ...
                    </button>
                </ProtectedAdminRoute>
            </div>

            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <h3 id="wd-quizzes-title">
                            <div className="d-flex justify-content-between">
                                Assignment Quizzes <div className="right-justify"><button className="btn p-0"></button></div>
                            </div>
                        </h3>
                    </div>
                    <ul id="wd-quiz-list" className="wd-lessons list-group rounded-0">


                        {quizzes.length === 0 ? (
                            <p className="center-justify">No quizzes available</p>
                        ) : (null)}


                        {quizzes.map((quiz: any) => (
                            <li className="wd-lesson list-group-item p-3 ps-5">
                                <a className="wd-assignment-link"
                                    href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}>
                                    {quiz.title}
                                </a>
                                <br /><span className="red-text">Multiple Modules</span> | <b>Not available until </b> {quiz.available || quiz.available_raw} |<br />
                                <b>Due</b> {quiz.due || quiz.due_raw} | {quiz.points} pts


                                <div className="float-end">
                                    <ProtectedAdminRoute>
                                        <FaPencil onClick={() =>
                                            window.location.href = `#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                            className="text-primary me-3" />
                                        {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => dispatch(deleteAssignment(assignment._id))} /> */}
                                        <FaTrash className="text-danger me-2 mb-1" onClick={() => { setDeleteWindow(true); setDeleteId(quiz._id); }} />


                                    </ProtectedAdminRoute>
                                    <GreenCheckmark />
                                    <IoEllipsisVertical className="fs-4" />
                                </div>
                                {deleteWindow && quiz._id === deleteId && (
                                    <div className="confirmation-dialog">
                                        <p>Are you sure you want to delete this quiz?</p>
                                        <button className="btn btn-success m-1" onClick={() => removeQuiz(quiz._id)/*dispatch(deleteAssignment(assignment._id))*/}>Yes</button>
                                        <button className="btn btn-danger m-1" onClick={() => setDeleteWindow(false)}>No</button>
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
