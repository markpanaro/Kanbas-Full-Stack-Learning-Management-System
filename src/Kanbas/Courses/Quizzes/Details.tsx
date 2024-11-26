import { useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as coursesClient from "../../Courses/client"
import { setQuizzes, deleteQuiz, addQuiz } from "../Quizzes/reducer";

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
    const [quizAvailable, setQuizAvailable] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.available_raw);
    const [quizDue, setQuizDue] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.due_raw);
    const [quizPoints, setQuizPoints] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.points);
    const [quizDesc, setQuizDesc] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.description);
    const quiz = quizzes.find((quiz: any) => quiz._id === quizId);
    const [quizQuestions, setQuizQuestions] = useState((quizzes.find((quiz: any) => quiz._id === quizId))?.questions || []);
    const [answers, setAnswers] = useState<{ [key: string]: [number, string] }>({});


    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const changeAnswer = (questionId: string, index: number) => {        
        const isCorrect = quiz.questions
        .find((question: any) => question._id === questionId)
        ?.choices[index]?.isCorrect || false;
        
        setAnswers({
            ...answers,
            [questionId]: [index, isCorrect]
        });
    };

    return (
        <div id="wd-quiz-details">
            <h1>{quizName}</h1>

            {currentUser && currentUser.role === "FACULTY" && (
                <div className="center-justify">
                    <h5>Quiz Type</h5>
                    <h5>Points {quizPoints}</h5>
                    <h5>Available {quizAvailable}</h5>
                    <h5>Due {quizDue}</h5>{quizDue}
                </div>
            )}

            <div className="">
                <h3>Questions</h3>
                {quizQuestions.map((question: any, index: any) => (
                    <div key={index} className="mb-3">
                        <h4>{question.title}</h4>
                        <p>Points: {question.points}</p>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
