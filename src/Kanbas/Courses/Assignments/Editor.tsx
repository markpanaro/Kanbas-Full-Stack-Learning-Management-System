import { useLocation, useParams } from "react-router";
import * as db from "../../Database";
import { addAssignment, deleteAssignment, updateAssignment }
    from "./reducer";
import { useDispatch } from "react-redux";

export default function AssignmentEditor() {
    const { pathname } = useLocation();
    const assignments = db.assignments;
    const assignmentID = pathname.split("/")[5];
    const assignmentName = (assignments.find((assignment) => assignment._id === assignmentID))?.title;
    const assignmentAvailable = (assignments.find((assignment) => assignment._id === assignmentID))?.available_raw;
    const assignmentDue = (assignments.find((assignment) => assignment._id === assignmentID))?.due_raw;
    const assignmentPoints = (assignments.find((assignment) => assignment._id === assignmentID))?.points;
    const assignmentDesc = (assignments.find((assignment) => assignment._id === assignmentID))?.description;

    const dispatch = useDispatch();

    return (
        <div id="wd-assignments-editor">
            <div className="container">

                <label htmlFor="wd-name">
                    Assignment Name
                </label><br />

                <input id="wd-name" value={assignmentName}
                    className="form-control mb-2" /><br />
                <textarea id="wd-description" className="form-control mb-2">
                    {assignmentDesc}
                </textarea>
                <br />
                <div className="">

                    <div className="">
                        <label htmlFor="wd-points">Points</label>

                        <input id="wd-points" className="form-control mb-1" value={assignmentPoints} />

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
                        value={assignmentDue} />
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="wd-available-from"> <b>Available from</b> </label>
                            <input type="date"
                                id="wd-available-from"
                                className="form-control mb-2"
                                value={assignmentAvailable} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="wd-available-until"> <b>Available until</b> </label>
                            <input type="date"
                                id="wd-available-until"
                                className="form-control mb-2"
                                value={assignmentDue} /><br />
                        </div>
                    </div>
                </div>
            </div>
            <h5 id="wd-buttons">_____________________________________________________________________________________</h5>

            <button id="wd-cancel"
                onClick={() => alert("Cancelled")} type="button"
                className="btn btn-secondary w-10">
                Cancel</button>
            {/*<button id="wd-save"
                onClick={() => alert("Saved")} type="button"
                className="btn btn-danger w-10">
                Save</button> */}
            <button id="wd-save"
                onClick={() => {
                    dispatch(addAssignment({
                        title: "Test",
                        course: "RS101",
                        _id: "A101",
                        available: 'TBD',
                        due: 'TBD',
                        points: 0,
                    }));
                }} type="button"
                className="btn btn-danger w-10">
                Save</button>
        </div>





    );
}
