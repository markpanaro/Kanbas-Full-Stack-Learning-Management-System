import { useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as coursesClient from "../../Courses/client"
import { setQuizzes, deleteQuiz, addQuiz } from "../Quizzes/reducer";
import * as gradesClient from "../Grades/client";

export default function Quizzes() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { pathname } = useLocation();
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    let [deleteWindow, setDeleteWindow] = useState(false);
    let [deleteId, setDeleteId] = useState("");
    let quizId = pathname.split("/")[5];
    const [quizName, setQuizName] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.title);
    const [quizAvailable, setQuizAvailable] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.available);
    const [quizDue, setQuizDue] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.due);
    const [quizPoints, setQuizPoints] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.points);
    const [quizDesc, setQuizDesc] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.description);
    const quiz = quizzes.find((quiz: any) => quiz._id === quizId);
    const [quizQuestions, setQuizQuestions] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.questions || []);
    const [answers, setAnswers] = useState<{ [key: string]: [number, string] }>({});
    const [currentScore, setCurrentScore] = useState(0);
    const [startQuiz, setStartQuiz] = useState(false);


    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const changeAnswer = (questionId: string, index: number) => {
        //const isCorrect = quiz.questions
        //    .find((question: any) => question._id === questionId)
        //    ?.choices[index]?.isCorrect || false;
        const question = quiz.questions.find((question: any) => question._id === questionId);
        const isCorrect = question?.choices[index]?.isCorrect || false;
        const points = question?.points || 0;


        const currentlyCorrect = answers[questionId]?.[1];

        //const isCorrectTest = question?.choices[index]?.isCorrect || false;



        if (isCorrect) {
            setCurrentScore(currentScore + points);
        } else if (currentlyCorrect && !isCorrect) {
            setCurrentScore(currentScore - points);
        }
        /*
   if (currentlyCorrect && !isCorrect) {
       setCurrentScore(currentScore - points);
   } else if (!currentlyCorrect && isCorrect) {
       setCurrentScore(currentScore + points);
   } else if (isCorrect) {
       setCurrentScore(currentScore + points);
   }
       */

        setAnswers({
            ...answers,
            [questionId]: [index, isCorrect]
        });
    };

    const changeFillInTheBlankAnswer = (questionId: string, answer: string) => {
        const question = quiz.questions.find((question: any) => question._id === questionId);
        const isCorrect = question?.answers.includes(answer.trim().toLowerCase());
        const points = question?.points || 0;
        const currentlyCorrect = answers[questionId]?.[1];

        if (isCorrect) {
            setCurrentScore(currentScore + points);
        } else if (currentlyCorrect && !isCorrect) {
            setCurrentScore(currentScore - points);
        }

        setAnswers({
            ...answers,
            [questionId]: [-1, isCorrect],
        });
    };

    const saveGrade = async () => {
        const newGrade = {
            quiz: quizId,
            answers: answers,
            user: currentUser._id,
            score: currentScore,
        };
        const existingGrade = await gradesClient.fetchGrade(quizId);
        const grade = await gradesClient.saveGrade(newGrade);

        //const existingGrade = await gradesClient.fetchGrade();
        //if (existingGrade._id) {
        //    await gradesClient.updateGrade(existingGrade._id, newGrade);
        //} else {
        //    const grade = await gradesClient.saveGrade(newGrade);
        //}

        //const grade = await gradesClient.saveGrade(newGrade);
        //if (!grade) {
        //    await gradesClient.saveGrade(newGrade);
        //}
        //const grade = await gradesClient.saveGrade(newGrade);
        //dispatch(updateAssignment(assignment));
    };

    return (
        <div id="wd-quiz-details">
            <h1>{quizName}</h1>

            {currentUser && currentUser.role === "FACULTY" && (
                <div className="center-justify">
                    <h5>Quiz Type {quiz.type}</h5>
                    <h5>Points {quizPoints}</h5>
                    <h5>Available {quizAvailable ? quizAvailable.split('T')[0] : 'N/A'}</h5>
                    <h5>Due {quizDue ? quizDue.split('T')[0] : 'N/A'}</h5>
                    <h5>Group {quiz.group}</h5>
                    <h5>Time {quiz.time}</h5>
                    <h5>Shuffle {quiz.shuffle}</h5>
                </div>
            )}<br />

            <div className="center-justify">
                {!startQuiz && currentUser && currentUser.role === "STUDENT" && (
                    <button
                        onClick={() => setStartQuiz(true)}
                        className="btn btn-danger">
                        Start Quiz
                    </button>
                )}
            </div>

            <div className="center-justify">
                {!startQuiz && currentUser && currentUser.role === "FACULTY" && (
                    <button
                        onClick={() => setStartQuiz(true)}
                        className="btn btn-danger">
                        Preview Quiz
                    </button>
                )}
            </div>

            {startQuiz && <div className="">
                <h3>Questions</h3>
                {quizQuestions.map((question: any, index: any) => (
                    <div key={index} className="mb-3">
                        <h4>{question.title}</h4>
                        <p>Points: {question.points}</p>
                        {/* The below is a simple way I found to render HTML.
                        In a proper app this should be sanified before rendering.
                        I trust that my question inputs will be safe though :) */}
                        <div dangerouslySetInnerHTML={{ __html: question.body }} />

                        {question.answers.length > 0 ? (
                            <input
                                type="text"
                                onChange={(e) => changeFillInTheBlankAnswer(question._id, e.target.value)}
                            />
                        ) : (
                            <ul>
                                {question.choices.map((choice: any, index: any) => (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            value={index}
                                            checked={answers[question._id]?.[0] === index}
                                            onChange={() => changeAnswer(question._id, index)
                                            }
                                        />
                                        {choice.text}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
                <button id="wd-save"
                    onClick={async () => {
                        { saveGrade() };
                        window.location.href = `#/Kanbas/Courses/${cid}/Grades/`;
                    }} type="button"
                    className="btn btn-danger w-10">
                    Save</button>
            </div>}
            <pre>{JSON.stringify(answers, null, 2)}</pre>
            <pre>{JSON.stringify(currentScore, null, 2)}</pre>

            {/* 
            <button id="wd-save"
                onClick={async () => {
                    { saveGrade() };
                    window.location.href = `#/Kanbas/Courses/${cid}/Grades/`;
                }} type="button"
                className="btn btn-danger w-10">
                Save</button>
                */}

        </div>
    );
}
