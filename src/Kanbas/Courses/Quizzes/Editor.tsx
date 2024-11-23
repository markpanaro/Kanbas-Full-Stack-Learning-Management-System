import { useLocation, useParams } from "react-router";
import * as db from "../../Database";
import { addAssignment, deleteAssignment, updateAssignment }
    from "../Assignments/reducer";
import { addQuiz, deleteQuiz, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as coursesClient from "../../Courses/client"
import * as quizzesClient from "./client"

export default function AssignmentEditor() {
    const { pathname } = useLocation();
    //const assignments = db.assignments;
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { cid } = useParams();
    let quizId = pathname.split("/")[5];
    const [quizName, setQuizName] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.title);
    const [quizAvailable, setQuizAvailable] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.available_raw);
    const [quizDue, setQuizDue] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.due_raw);
    const [quizPoints, setQuizPoints] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.points);
    const [quizDesc, setQuizDesc] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.description);

    const createQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = {
            title: quizName, course: cid, _id: quizId,
            available_raw: quizAvailable,
            due_raw: quizDue,
            points: quizPoints,
            description: quizDesc,
        };
        const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        dispatch(addQuiz(quiz));
    };

    const saveQuiz = async () => {
        const newQuiz = {
            title: quizName, course: cid, _id: quizId,
            available_raw: quizAvailable,
            due_raw: quizDue,
            points: quizPoints,
            description: quizDesc,
        };
        const quiz = await quizzesClient.saveQuiz(newQuiz);
        dispatch(updateQuiz(quiz));
    };


    let createQuizFlag = false;
    if (quizId === "new") {
        quizId = new Date().toISOString();
        createQuizFlag = true;
    }


    const dispatch = useDispatch();

    return (
        <div id="wd-quizzes-editor">
            <div className="container">

                <label htmlFor="wd-name">
                    Quiz Name
                </label><br />

                <input id="wd-name" value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    className="form-control mb-2" /><br />
                <textarea id="wd-description" className="form-control mb-2"
                    onChange={(e) => setQuizDesc(e.target.value)}>
                    {quizDesc}
                </textarea>
                <br />
                <div className="">

                    <div className="">
                        <label htmlFor="wd-points">Points</label>

                        <input id="wd-points" className="form-control mb-1" value={quizPoints}
                            onChange={(e) => setQuizPoints(e.target.value)} />

                    </div><br />


                    <div id="wd-group">Assignment Group
                        <select className="form-control mb-2">
                            <option className="form-control mb-2" value="QUIZ">QUIZ</option>
                            <option className="form-control mb-2" value="ASSIGNMENTS" selected>ASSIGNMENTS</option>
                            <option className="form-control mb-2" value="PROJECT">PROJECT</option>
                        </select>
                    </div><br />

                    <div id="wd-display-grade-as">Display Grade as
                        <select className="form-control mb-2">
                            <option value="LETTER">Letter</option>
                            <option value="PERCENT" selected>Percentage</option>
                            <option value="VAL3">Value 3</option><br />
                        </select>
                        <br />

                        <div id="wd-submission-type">Submission Type
                            <div className="form-control mb-2">
                                <select className="form-control mb-2">
                                    <option value="ONLINE">Online</option><br />
                                </select>
                                <br />

                                <label id=""><b>Online Entry Options</b></label><br />

                                <input type="checkbox" name="check-entry" id="wd-text-entry" />
                                <label htmlFor="wd-text-entry">Text Entry</label><br />

                                <input type="checkbox" name="check-entry" id="wd-website-url" />
                                <label htmlFor="wd-website-url">Website URL</label><br />

                                <input type="checkbox" name="check-entry" id="wd-media-recordings" />
                                <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                                <input type="checkbox" name="check-entry" id="wd-student-annotation" />
                                <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                                <input type="checkbox" name="check-entry" id="wd-file-upload" />
                                <label htmlFor="wd-file-upload">File Uploads</label>
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                Assign
                <div className="form-control mb-2" >
                    <b>Assign to</b> <br /><input className="form-control mb-2" id="wd-assign-to" value="Everyone" /><br /><br />

                    <label htmlFor="wd-due-date"> <b>Due</b> </label>
                    <input type="date"
                        id="wd-due-date"
                        className="form-control mb-2"
                        onChange={(e) => setQuizDue(e.target.value)}
                        value={quizDue} />
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="wd-available-from"> <b>Available from</b> </label>
                            <input type="date"
                                id="wd-available-from"
                                className="form-control mb-2"
                                onChange={(e) => setQuizAvailable(e.target.value)}
                                value={quizAvailable} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="wd-available-until"> <b>Available until</b> </label>
                            <input type="date"
                                id="wd-available-until"
                                className="form-control mb-2"
                                value={quizDue} /><br />
                        </div>
                    </div>
                </div>
            </div>
            <h5 id="wd-buttons">_____________________________________________________________________________________</h5>

            <button id="wd-cancel"
                onClick={() => window.location.href = `#/Kanbas/Courses/${cid}/Quizzes/`
                } type="button"
                className="btn btn-secondary w-10">
                Cancel</button>
            {/*<button id="wd-save"
                onClick={() => alert("Saved")} type="button"
                className="btn btn-danger w-10">
                Save</button> */}
            <button id="wd-save"
                onClick={async () => {
                    if (createQuizFlag) {
                        createQuizForCourse();
                    } else {
                        saveQuiz()
                    }
                    ;
                    window.location.href = `#/Kanbas/Courses/${cid}/Quizzes/`;
                }} type="button"
                className="btn btn-danger w-10">
                Save</button>
        </div>
    );
}
