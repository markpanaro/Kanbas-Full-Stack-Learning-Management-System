export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div className="col">
                <label htmlFor="wd-name">
                    Assignment Name
                </label><br />

                <input id="wd-name" value="A1 - ENV + HTML"
                    className="form-control mb-2" /><br />
                <textarea id="wd-description" className="form-control mb-2">
                    The assignment is available online Submit a link to the landing page of...
                </textarea>
                <br />
                <div className="">

                    <div className="">
                        <label htmlFor="wd-points">Points</label>

                        <input id="wd-points" className="form-control mb-1" value={100} />

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

                                <label id="">Online Entry Options:</label><br />

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

                <div className="form-control mb-2">
                    Assign to <br /><input className="form-control mb-2" id="wd-assign-to" value="Everyone" /><br /><br />

                    <label htmlFor="wd-due-date"> Due: </label>
                    <input type="date"
                        id="wd-due-date"
                        className="form-control mb-2"
                        value="2024-05-13" />
                    <br />

                    <div className="row">
                        <label htmlFor="wd-available-from"> Available from: </label>
                        <input type="date"
                            id="wd-available-from"
                            className="form-control mb-2"
                            value="2024-05-06" />
                        <label htmlFor="wd-available-until"> Available until: </label>
                        <input type="date"
                            id="wd-available-until"
                            className="form-control mb-2"
                            value="2024-05-20" /><br />
                    </div>

                </div>
                <h5 id="wd-buttons">__________________________________________________________________________________________________________</h5>

                <button id="wd-cancel"
                    onClick={() => alert("Cancelled")} type="button"
                    className="btn btn-secondary w-10">
                    Cancel</button>
                <button id="wd-save"
                    onClick={() => alert("Saved")} type="button"
                    className="btn btn-danger w-10">
                    Save</button>
            </div>
        </div >




    );
}
