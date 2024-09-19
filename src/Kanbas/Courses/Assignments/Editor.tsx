export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of...
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                {/* Complete on your own */}
                <tr>
                    <div id="wd-group">Assignment Group
                        <select>
                            <option value="QUIZ">QUIZ</option>
                            <option value="ASSIGNMENTS" selected>ASSIGNMENTS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </div><br />
                </tr>
                <tr>
                    <div id="wd-display-grade-as">Display Grade as
                        <select>
                            <option value="LETTER">Letter</option>
                            <option value="PERCENT" selected>Percentage</option>
                            <option value="VAL3">Value 3</option><br />
                        </select>
                    </div><br />
                </tr>
                <tr>
                    <div id="wd-submission-type">Submission Type
                        <select>
                            <option value="ONLINE">Online</option><br />
                        </select>
                    </div><br />
                </tr>
                <tr>
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
                </tr><br />
                <tr>
                    Assign to <br /><input id="wd-assign-to" value="Everyone" /><br /><br />
                </tr>
                <tr>
                    <label htmlFor="wd-due-date"> Due: </label>
                    <input type="date"
                        id="wd-due-date"
                        value="2024-05-13" />
                </tr><br />
                <tr>
                    <label htmlFor="wd-available-from"> Available from: </label>
                    <input type="date"
                        id="wd-available-from"
                        value="2024-05-06" />
                    <label htmlFor="wd-available-until"> Available until: </label>
                    <input type="date"
                        id="wd-available-until"
                        value="2024-05-20" /><br />
                </tr>
            </table>
        </div>
    );
}
