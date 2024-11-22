import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
// import * as db from "./Database";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
// import store from "./store";
// import { Provider } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Courses/Enrollments/client";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [courses, enrollments, currentUser]);

    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };
    const deleteCourse = async (courseId: any) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };


    const createEnrollments = async (userId: string, courseId: string) => {
        try {
            const brandNewEnrollment = await enrollmentsClient.createEnrollment(courseId);
        } catch (error) {
            console.error("Error creating enrollment:", error);
        }
    }
    const deleteEnrollments = async (userId: string, courseId: string) => {
        try {
            const brandNewEnrollment = await enrollmentsClient.deleteEnrollment(courseId);
        } catch (error) {
            console.error("Error deleting enrollment:", error);
        }
    }
    const fetchEnrollments = async () => {
        await enrollmentsClient.fetchEnrollments();
    };
    useEffect(() => {
        fetchEnrollments();
    }, [enrollments, courses, currentUser]);

    return (
        // <Provider store={store}>
        <Session>
            <div id="wd-kanbas">
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            createEnrollments={createEnrollments}
                            deleteEnrollments={deleteEnrollments}
                            enrollments={enrollments} /> </ProtectedRoute>} />
                        { /* <Route path="/Courses/:cid/*" element={<Courses />} /> */}
                        <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div >
        </Session>
        // </Provider>
    );
}
