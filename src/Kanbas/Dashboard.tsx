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
    deleteCourse, updateCourse, createEnrollments, deleteEnrollments, enrollments,
    enrolling, setEnrolling, updateEnrollment }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        createEnrollments: (userId: string, courseId: string) => void;
        deleteEnrollments: (userId: string, courseId: string) => void;
        updateCourse: () => void; enrollments: any[];
        enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
        updateEnrollment: (courseId: string, enrolled: boolean) => void
    }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [changeEnrollments, setChangeEnrollments] = useState<boolean>(true);

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
    }, [courses, allCourses, enrollments]);


    return (
        <div id="wd-dashboard">

            <h1 id="wd-dashboard-title">Dashboard</h1> <hr /><br />

            <ProtectedAdminRoute>
                <input defaultValue={course.name} className="form-control mb-2"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <textarea defaultValue={course.description} className="form-control"
                    onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr /> {/* was courses */}
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
                {/*
                <button className="btn btn-primary float-end"
                    id="wd-enrollments-click"
                    onClick={() => setChangeEnrollments(change => !change)} > Enrollments </button>
                */}
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </ProtectedStudentRoute>

            <div id="wd-dashboard-courses" className="row">
                {changeEnrollments ? (

                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {/* was courses */}
                        {courses.map((course) => (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                                        {/* <img src={`/images/${course._id}.jpg`} width="100%" height={160} /> */}
                                        <img src={`/images/react.jpg`} width="100%" height={160} />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">

                                                {enrolling && (
                                                    <button onClick={(event) => {
                                                        event.preventDefault();
                                                        updateEnrollment(course._id, !course.enrolled);
                                                    }}
                                                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                                        {course.enrolled ? "Unenroll" : "Enroll"}
                                                    </button>
                                                )}

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

                                            {enrolling && (
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    updateEnrollment(course._id, !course.enrolled);
                                                }}
                                                    className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                                    {course.enrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}

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

                                            currentUser._id === enrollment.user &&
                                            course._id === enrollment.course) ? (
                                            <button id="wd-enroll-course-click"
                                                onClick={() => {
                                                    let userId = currentUser._id;
                                                    let courseId = course._id;
                                                    dispatch(deleteEnrollment({ userId, courseId }));
                                                    deleteEnrollments(userId, courseId)
                                                    dispatch(deleteEnrollment({ userId, courseId }));
                                                    fetchAllCourses();
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