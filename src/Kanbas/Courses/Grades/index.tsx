import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import * as coursesClient from "../../Courses/client"
import * as quizzesClient from "../Quizzes/client"
import { setQuizzes, deleteQuiz, addQuiz } from "../Quizzes/reducer";
import * as gradesClient from "../Grades/client"



export default function Grades() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [grades, setGrades] = useState<{ [key: string]: any }>({});
    let [deleteWindow, setDeleteWindow] = useState(false);
    let [deleteId, setDeleteId] = useState("");

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));

        const fetchGrades = async () => {
            const gradesData: { [key: string]: any } = {};
            for (let quiz of quizzes) {
                const grade = await gradesClient.fetchGrade(quiz._id);
                gradesData[quiz._id] = grade;
            }
            setGrades(gradesData);
        };
        fetchGrades();
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);  //had quizzes before


    const getGrade = async () => {
        for (let quiz of quizzes) {
            const grade = await gradesClient.fetchGrade(quiz._id);
        }
    };

    type Answer = [number, boolean];

    return (
        <div id="wd-grades">
            <h1>Grades</h1>
            {quizzes.map((quiz: any) => (
                <li className="wd-lesson list-group-item p-3 ps-5">
                    <a className="wd-assignment-link"
                        href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/details`}>
                        {quiz.title}
                    </a>
                    <br /><span className="red-text">Multiple Modules</span> | <b>Not available until </b> {quiz.available?.split('T')[0] || "N/A"} |<br />
                    <b>Due</b> {quiz.due?.split('T')[0] || "N/A"} | {quiz.points} pts

                    {/* <pre>{JSON.stringify(grades[quiz._id], null, 2)}</pre> */}


                    {grades[quiz._id]?.map((grade: any) => (
                        <div key={grade.id}>



                            {/* 
                            {Object.entries(grade.answers).map((answer) => {
                                //const [score, isCorrect] = answer;
                                const score = answer[0];
                                const isCorrect = answer[1];
                            return (
                            <li >
                                Score: {score}, Correct: {isCorrect ? 'Yes' : 'No'}
                            </li>
                            );
                            })}
                            */}

                            <b>Earned points: </b>{grade.score}<br/>
                            <b>Date taken: </b>{grade.taken?.split('T')[0] || "N/A"}<br/>
                            <b>Questions:</b>
                            {Object.entries(grade.answers).map(([_id, answer]) => {
                                //const [score, isCorrect] = answer;
                                //const score = answer[0];
                                //const isCorrect = answer[1];
                                const [choice, isCorrect] = answer as Answer;
                                return (
                                    <li >
                                        Answered: {choice}, Correct?: {isCorrect ? <FcCheckmark /> : <RxCross2 style={{ color: "red" }} />}
                                    </li>
                                );
                            })}

                        </div>
                    ))}


                </li>


            ))}

        </div>
    );
}
