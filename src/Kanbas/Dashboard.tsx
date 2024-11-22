import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import * as db from "./Database";
import ProtectedAdminRoute from "./Account/ProtectedAdminRoute";
import ProtectedStudentRoute from "./Account/ProtectedStudentRoute";
import { addEnrollment, deleteEnrollment } from "./Courses/People/reducer";
import * as accountClient from "./Account/client"
import { setEnrollments } from "./Courses/People/reducer";
import * as userClient from "./Account/client"

import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Courses/Enrollments/client";
export default function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [changeEnrollments, setChangeEnrollments] = useState<boolean>(true);





    const fetchEnrollments = async () => {
        const enrollments = await enrollmentsClient.fetchEnrollments();
        dispatch(setEnrollments(enrollments));
    };
    useEffect(() => {
        fetchEnrollments();
    },);




    // Same data as passed variable courses
    // but here was able to have courses refresh on enrollment updates
    const [userCourses, setUserCourses] = useState<any[]>([]);
    const fetchCourses = async () => {
        try {
            const userCourses = await userClient.findMyCourses();
            setUserCourses(userCourses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [enrollments, currentUser]);





    const createEnrollments = async (userId: string, courseId: string) => {
        try {
            dispatch(addEnrollment({ userId, courseId }));
            const brandNewEnrollment = await enrollmentsClient.createEnrollment(courseId);
            //dispatch(addEnrollment({ user: userId, course: courseId }));
            dispatch(addEnrollment({ userId, courseId }));
            fetchCourses();
        } catch (error) {
            console.error("Error creating enrollment:", error);
        }
    }

    const deleteEnrollments = async (userId: string, courseId: string) => {
        try {
            const brandNewEnrollment = await enrollmentsClient.deleteEnrollment(courseId);
            //dispatch(addEnrollment({ user: userId, course: courseId }));
            dispatch(deleteEnrollment({ userId, courseId }));
            fetchEnrollments();
            fetchCourses();
        } catch (error) {
            console.error("Error deleting enrollment:", error);
        }
    }


    const [allCourses, setAllCourses] = useState<any[]>([]);
    const fetchAllCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            setAllCourses(allCourses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAllCourses();
    },);



    return (
        <div id="wd-dashboard">

            <h1 id="wd-dashboard-title">Dashboard</h1> <hr /><br />

            <ProtectedAdminRoute>
                <input defaultValue={course.name} className="form-control mb-2"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <textarea defaultValue={course.description} className="form-control"
                    onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2> <hr /> {/* was courses */}
                <h5>New Course
                    <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse} > Add </button>
                    <button className="btn btn-warning float-end me-2"
                        onClick={updateCourse} id="wd-update-course-click">
                        Update
                    </button>
                </h5><hr />
            </ProtectedAdminRoute>

            <ProtectedStudentRoute>
                <button className="btn btn-primary float-end"
                    id="wd-enrollments-click"
                    onClick={() => setChangeEnrollments(change => !change)} > Enrollments </button>
            </ProtectedStudentRoute>

            <div id="wd-dashboard-courses" className="row">
                {changeEnrollments ? (

                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {/* was courses */}
                        {userCourses.map((course) => (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                                        {/* <img src={`/images/${course._id}.jpg`} width="100%" height={160} /> */}
                                        <img src={`/images/react.jpg`} width="100%" height={160} />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name} </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                {course.description} </p>
                                            <button className="btn btn-primary"> Go </button>

                                            <ProtectedAdminRoute>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} className="btn btn-danger float-end"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                                <button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }}
                                                    className="btn btn-warning me-2 float-end" >
                                                    Edit
                                                </button>
                                            </ProtectedAdminRoute>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {allCourses.map((course) => (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    { /* <Link to={`/Kanbas/Courses/${course._id}/Home`} */}
                                    < div className="wd-dashboard-course-link text-decoration-none text-dark" />


                                    {/* <img src={`/images/${course._id}.jpg`} width="100%" height={160} /> */}
                                    <img src={`/images/react.jpg`} width="100%" height={160} />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name} </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description} </p>
                                        {enrollments.some((enrollment: any) =>
                                            enrollment.user === currentUser._id &&
                                            enrollment.course === course._id) ? (
                                            <button className="btn btn-primary"
                                                onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}>
                                                Go </button>)
                                            : null}

                                        <ProtectedAdminRoute>
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }} className="btn btn-danger float-end"
                                                id="wd-delete-course-click">
                                                Delete
                                            </button>
                                            <button id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end" >
                                                Edit
                                            </button>
                                        </ProtectedAdminRoute>

                                        {enrollments.some((enrollment: any) =>
                                            enrollment.user === currentUser._id &&
                                            enrollment.course === course._id) ? (
                                            <button id="wd-enroll-course-click"
                                                onClick={() => {
                                                    let userId = currentUser._id;
                                                    let courseId = course._id;
                                                    //dispatch(deleteEnrollment({ user: userId, course: courseId }));
                                                    deleteEnrollments(userId, courseId)
                                                    dispatch(deleteEnrollment({ userId, courseId }));
                                                }}
                                                className="btn btn-danger me-2 float-end" >
                                                Unenroll
                                            </button>

                                        ) : (
                                            <button id="wd-enroll-course-click"
                                                onClick={() => {
                                                    let userId = currentUser._id;
                                                    let courseId = course._id;
                                                    console.log("USERNAME", userId)
                                                    //dispatch(addEnrollment({ user: userId, course: courseId }));
                                                    createEnrollments(userId, courseId);
                                                    // For visual change
                                                    dispatch(addEnrollment({ userId, courseId }));
                                                }}
                                                className="btn btn-success me-2 float-end" >
                                                Enroll
                                            </button>
                                        )}
                                    </div>
                                    {/*</Link> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}