import { useLocation, useParams } from "react-router";
import * as db from "../../Database";
import { addAssignment, deleteAssignment, updateAssignment }
    from "../Assignments/reducer";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as coursesClient from "../../Courses/client"
import * as quizzesClient from "./client"
import Editor from 'react-simple-wysiwyg';

export default function AssignmentEditor() {
    const { pathname } = useLocation();
    //const assignments = db.assignments;
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { cid } = useParams();
    let quizId = pathname.split("/")[5];
    const [quizName, setQuizName] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.title || "Unnamed Quiz");
    const [quizAvailable, setQuizAvailable] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.available);
    const [quizDue, setQuizDue] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.due);
    const [quizPoints, setQuizPoints] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.points);
    const [quizDesc, setQuizDesc] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.description);
    const [quizPublished, setQuizPublished] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.published || false);
    const [quizType, setQuizType] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.type || "GRADED_QUIZ");
    const [quizGroup, setQuizGroup] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.type || "ASSIGNMENTS");
    const [quizTime, setQuizTime] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.time || 20);
    const [quizShuffle, setQuizShuffle] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.shuffle || false);


    const [activeTab, setActiveTab] = useState('details');
    const [selectedQuestionType, setSelectedQuestionType] = useState<string>('multipleChoice');


    const [quizQuestions, setQuizQuestions] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.questions || []);

    // wysiwyg editor question
    const [questionBody, setQuestionBody] = useState('');
    function onChange(e: any) {
        setQuestionBody(e.target.value);
    }

    // wysiwyg editor instructions
    const [quizInstructions, setQuizInstructions] = useState('');
    function onInstructionBodyChange(e: any) {
        setQuizInstructions(e.target.value);
    }

    const createQuizForCourse = async () => {
        if (!cid) return;

        const totalPoints = quizQuestions.reduce((total: any, question: any) => {
            return total + (question.points || 0);
        }, 0);


        const newQuiz = {
            title: quizName, course: cid, _id: quizId,
            instructions: quizInstructions,
            available: quizAvailable,
            due: quizDue,
            points: totalPoints,
            description: quizDesc,
            published: quizPublished,
            type: quizType,
            group: quizGroup,
            time: quizTime,
            shuffle: quizShuffle,

            questions: quizQuestions,

        };
        const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        dispatch(addQuiz(quiz));
    };

    const saveQuiz = async () => {

        const totalPoints = quizQuestions.reduce((total: any, question: any) => {
            return total + (question.points || 0);
        }, 0);

        const newQuiz = {
            title: quizName, course: cid, _id: quizId,
            instructions: quizInstructions,
            available: quizAvailable,
            due: quizDue,
            points: totalPoints,
            description: quizDesc,
            published: quizPublished,
            type: quizType,
            group: quizGroup,
            time: quizTime,
            shuffle: quizShuffle,

            questions: quizQuestions

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

    /*
        const fetchQuizzes = async () => {
            const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
            dispatch(setQuizzes(quizzes));
        };
        useEffect(() => {
            fetchQuizzes();
        }, [activeTab]);
    */

    // Multiple Choice Question - move consts to top
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionPoints, setQuestionPoints] = useState(0);
    const [choices, setChoices] = useState([{ text: '', isCorrect: false }]);

    const addChoice = () => setChoices([...choices, { text: '', isCorrect: false }]);
    const removeChoice = (index: any) => setChoices(choices.filter((_, i) => i !== index));

    // Edit choices
    const editChoices = (index: any, newText: any) => {
        const newChoices = choices.slice();
        newChoices[index].text = newText;
        setChoices(newChoices);
    };

    // Change right answer
    const changeCorrect = (index: any) => {
        const newChoices = choices.map((choice, i) => ({ ...choice, isCorrect: i === index }));
        setChoices(newChoices);
    };

    const changeTrueFalseCorrect = (index: any) => {
        const newChoices = trueFalse.map((choice, i) => ({ ...choice, isCorrect: i === index }));
        setChoices(newChoices);
    };

    const addQuestion = () => {
        const newQuestion = {
            title: questionTitle,
            points: questionPoints,
            choices: choices,
            body: questionBody,

            //_id: new Date().toISOString(),
            _id: updateQuestionIndex !== null ? quizQuestions[updateQuestionIndex]._id : new Date().toISOString(),

        };

        const upsertQuestion = updateQuestionIndex !== null
            ? quizQuestions.map((question: any, index: any) => index === updateQuestionIndex ? newQuestion : question)
            : [...quizQuestions, newQuestion];

        setQuizQuestions(upsertQuestion);

        //setQuizQuestions([...quizQuestions, newQuestion]);

        // Reset fields
        setQuestionTitle('');
        setQuestionPoints(0);
        setQuestionBody('');
        setChoices([{ text: '', isCorrect: false }]);
    };

    const addTrueFlaseQuestion = () => {
        const newQuestion = {
            title: questionTitle,
            points: questionPoints,
            choices: trueFalse,

            _id: new Date().toISOString(),

        };
        setQuizQuestions([...quizQuestions, newQuestion]);

        // Reset fields
        setQuestionTitle('');
        setQuestionPoints(0);
        setChoices([{ text: '', isCorrect: false }]);
    };

    const saveQuestion = async () => {
        const newQuiz = {
            questions: quizQuestions
        };
        const quiz = await quizzesClient.saveQuiz(newQuiz);
        dispatch(updateQuiz(quiz));
    };

    const [trueFalse, setTrueFalse] = useState([{ text: 'True', isCorrect: false }, { text: 'False', isCorrect: false }]);


    // Fill in the blank questions
    const [fillInBlankAnswers, setFillInBlankAnswers] = useState(['']);

    const addFillInBlankAnswer = () => setFillInBlankAnswers([...fillInBlankAnswers, '']);
    const removeFillInBlankAnswer = (index: any) =>
        setFillInBlankAnswers(fillInBlankAnswers.filter((_, i) => i !== index));
    const editFillInBlankAnswer = (index: any, newText: any) => {
        const newAnswers = fillInBlankAnswers.slice();
        newAnswers[index] = newText;
        setFillInBlankAnswers(newAnswers);
    }

    const addFillInBlankQuestion = () => {
        const newQuestion = {
            //type: 'fill-in-the-blank',  // Defining actual question types would be more clean
            title: questionTitle,
            points: questionPoints,
            answers: fillInBlankAnswers, //.map(answer => answer.toLowerCase()),
            body: questionBody,
            //choices: choices, // this is added for rendering purposes only, choices is expected to exist 

            //_id: new Date().toISOString(),
            _id: updateQuestionIndex !== null ? quizQuestions[updateQuestionIndex]._id : new Date().toISOString(),
        };

        const upsertQuestion = updateQuestionIndex !== null
            ? quizQuestions.map((question: any, index: any) => index === updateQuestionIndex ? newQuestion : question)
            : [...quizQuestions, newQuestion];

        setQuizQuestions(upsertQuestion);

        //setQuizQuestions([...quizQuestions, newQuestion]);
        setQuestionTitle('');
        setQuestionPoints(0);
        setQuestionBody('');
        setFillInBlankAnswers(['']);
    };

    // edit questions
    const [updateQuestionIndex, setUpdateQuestionIndex] = useState<number | null>(null);

    const updateQuestion = (index: number) => {
        setUpdateQuestionIndex(index);
        const question = quizQuestions[index];
        setQuestionTitle(question.title);
        setQuestionPoints(question.points);
        setChoices(question.choices || []);
        setFillInBlankAnswers(question.answers || []);
    }


    const cancelQuestion = () => {
        setUpdateQuestionIndex(null);
        setQuestionTitle('');
        setQuestionPoints(0);
        setChoices([]);
        setFillInBlankAnswers([]);
    }


    return (
        <div id="wd-quizzes-editor">

            <div className="tabs">
                <button
                    onClick={() => setActiveTab('details')}
                    className="btn btn-success me-2  w-10">
                    Details
                </button>
                <button
                    onClick={() => setActiveTab('questions')}
                    className="btn btn-primary me-2 w-10">

                    Questions
                </button>
            </div>

            {activeTab === 'details' && (
                <div className="container">

                    <label htmlFor="wd-name">
                        Quiz Name
                    </label><br />

                    <input id="wd-name" value={quizName} placeholder={"Unnamed Quiz"}
                        onChange={(e) => setQuizName(e.target.value)}
                        className="form-control mb-2" /><br />
                    {/*<textarea id="wd-description" className="form-control mb-2"
                        placeholder={"Provide a description for the quiz"}
                        onChange={(e) => setQuizDesc(e.target.value)}>
                        {quizDesc}
                    </textarea>*/}
                    <Editor
                        value={quizInstructions}
                        onChange={onInstructionBodyChange}
                        placeholder="Question body"
                    />
                    <br />
                    <div className="">

                        <div id="wd-type">Quiz Type
                            <select className="form-control mb-2" value={quizType} onChange={(event) => setQuizType(event.target.value)}>
                                <option className="form-control mb-2" value="PRACTICE_QUIZ">Practice Quiz</option>
                                <option className="form-control mb-2" value="GRADED_QUIZ">Graded Quiz</option>
                                <option className="form-control mb-2" value="GRADED_SURVEY">Graded Survey</option>
                                <option className="form-control mb-2" value="UNGRADED_SURVEY">Ungraded Survey</option>
                            </select>
                        </div><br />


                        <div id="wd-group">Assignment Group
                            <select className="form-control mb-2" value={quizGroup} onChange={(event) => setQuizGroup(event.target.value)}>
                                <option className="form-control mb-2" value="QUIZ">QUIZ</option>
                                <option className="form-control mb-2" value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option className="form-control mb-2" value="PROJECT">PROJECT</option>
                            </select>
                        </div><br />

                        Time
                        <input id="wd-name" type="Number" value={quizTime}
                            onChange={(e) => setQuizTime(e.target.value)}
                            className="form-control mb-2" /><br />

                        <div>
                            <input
                                type="checkbox"
                                id="quizShuffleCheckbox"
                                checked={quizShuffle}
                                onChange={(event) => setQuizShuffle(event.target.checked)}
                            />
                            Shuffle Questions
                        </div>

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
            )}

            {activeTab === 'questions' && (
                <div>
                    <h2>Questions</h2>
                    <p>Here are the questions for the quiz.</p>


                    <div className="">
                        <h3>Existing Questions</h3>
                        {quizQuestions.map((question: any, index: any) => (
                            <div key={index} className="mb-3">
                                <h4>{question.title}</h4>
                                <p>Points: {question.points}</p>
                                <ul>
                                    {question.choices?.map((choice: any, i: any) => (
                                        <li key={i}>
                                            {choice.text} {choice.isCorrect && "(Correct)"}
                                        </li>
                                    ))}
                                    {question.answers?.map((answer: any, i: any) => (
                                        <li key={i}>
                                            {answer}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => updateQuestion(index)} className="btn btn-warning">Edit</button>
                            </div>
                        ))}
                    </div>

                    <select
                        value={selectedQuestionType}
                        onChange={(event) => setSelectedQuestionType(event.target.value)}>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="trueFalse">True/False</option>
                        <option value="fillIn">Fill in the Blank</option>
                    </select>

                    {selectedQuestionType === 'multipleChoice' &&
                        <div className="">
                            <h3>Add Multiple Choice Question</h3>
                            <input
                                type="text"
                                value={questionTitle}
                                onChange={(e) => setQuestionTitle(e.target.value)}
                                placeholder="Question Title"
                                className="form-control mb-2"
                            />
                            <input
                                type="number"
                                value={questionPoints}
                                onChange={(e) => setQuestionPoints(Number(e.target.value))}
                                className="form-control mb-2"
                            />
                            <Editor
                                value={questionBody}
                                onChange={onChange}
                                placeholder="Question body"
                            />

                            <div className="">
                                <h4>Choices</h4>
                                {choices.map((choice, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            value={choice.text}
                                            onChange={(e) => editChoices(index, e.target.value)}
                                            placeholder={`Choice ${index + 1}`}
                                            className="form-control me-2"
                                        />
                                        <input
                                            type="radio"
                                            checked={choice.isCorrect}
                                            onChange={() => changeCorrect(index)}
                                            className="form-check-input me-2"
                                        />
                                        <button onClick={() => removeChoice(index)} className="btn btn-danger">Remove</button>
                                    </div>
                                ))}
                                <button onClick={addChoice} className="btn btn-primary mt-2">Add Choice</button>
                            </div>
                            {/*<button onClick={() => {addQuestion(); saveQuiz()}} className="btn btn-success mt-3">Add Question</button> */}
                            <button onClick={cancelQuestion} className="btn btn-secondary mt-3">Cancel</button>
                            <button onClick={addQuestion} className="btn btn-success mt-3">Save Question</button>
                        </div>
                    }


                    {selectedQuestionType === 'trueFalse' &&
                        <div className="">
                            <h3>Add True/False Question</h3>
                            <input
                                type="text"
                                value={questionTitle}
                                onChange={(e) => setQuestionTitle(e.target.value)}
                                placeholder="Question Title"
                                className="form-control mb-2"
                            />
                            <input
                                type="number"
                                value={questionPoints}
                                onChange={(e) => setQuestionPoints(Number(e.target.value))}
                                className="form-control mb-2"
                            />
                            <Editor
                                value={questionBody}
                                onChange={onChange}
                                placeholder="Question body"
                            />

                            <div className="t">
                                <h4>Choices</h4>
                                {trueFalse.map((choice, index) => (
                                    <div key={index} className="mb-2">
                                        {/*
                                    <input
                                        type="text"
                                        value={choice.text}
                                        onChange={(e) => editChoices(index, e.target.value)}
                                        placeholder={`Choice ${index + 1}`}
                                        className="form-control me-2"
                                    />
                                    */}
                                        {choice.text}
                                        <input
                                            type="radio"
                                            name="choiceTrue"
                                            checked={choice.isCorrect}
                                            onChange={() => changeTrueFalseCorrect(index)}
                                            className="form-check-input-l me-2"
                                        />


                                    </div>


                                ))}

                            </div>
                            {/*<button onClick={() => {addQuestion(); saveQuiz()}} className="btn btn-success mt-3">Add Question</button> */}
                            <button onClick={cancelQuestion} className="btn btn-secondary mt-3">Cancel</button>
                            <button onClick={addQuestion} className="btn btn-success mt-3">Save Question</button>
                        </div>
                    }

                    {selectedQuestionType === 'fillIn' &&
                        <div className="">
                            <h3>Add Fill in the Blank Question</h3>
                            <input
                                type="text"
                                value={questionTitle}
                                onChange={(e) => setQuestionTitle(e.target.value)}
                                placeholder="Question Title"
                                className="form-control mb-2"
                            />
                            <input
                                type="number"
                                value={questionPoints}
                                onChange={(e) => setQuestionPoints(Number(e.target.value))}
                                className="form-control mb-2"
                            />
                            <Editor
                                value={questionBody}
                                onChange={onChange}
                                placeholder="Question body"
                            />

                            <div className="">
                                <h4>Accepted Answers</h4>
                                {fillInBlankAnswers.map((answer, index) => (

                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            value={answer}
                                            onChange={(e) => editFillInBlankAnswer(index, e.target.value)}
                                            placeholder={`Answer ${index + 1}`}
                                            className="form-control me-2"
                                        />
                                        <button onClick={() => removeFillInBlankAnswer(index)} className="btn btn-danger">Remove</button>
                                    </div>
                                ))}
                                <button onClick={addFillInBlankAnswer} className="btn btn-primary mt-2">Add Answer</button>
                            </div>
                            <button onClick={cancelQuestion} className="btn btn-secondary mt-3">Cancel</button>
                            <button onClick={addFillInBlankQuestion} className="btn btn-success mt-3">Save Question</button>
                        </div>
                    }

                </div>
            )}

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
