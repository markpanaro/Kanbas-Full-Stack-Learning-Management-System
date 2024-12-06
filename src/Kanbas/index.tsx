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
import { useDispatch, useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Courses/Enrollments/client";
import { setEnrollments } from "./Courses/People/reducer";

export default function Kanbas() {
    const dispatch = useDispatch();
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    /*
        const fetchCourses = async () => {
            try {
                //const courses = await userClient.findMyCourses();
                const courses = await courseClient.fetchAllCourses();
                setCourses(courses);
            } catch (error) {
                console.error(error);
            }
        };
        useEffect(() => {
            fetchCourses();
        }, [courses, enrollments, currentUser]);
    */

    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
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
        const fetchedEnrollments = await enrollmentsClient.fetchEnrollments();
        dispatch(setEnrollments(fetchedEnrollments));
    };
    //useEffect(() => {
    //    fetchEnrollments();
    //}, [ currentUser ]); // [enrollments, courses, currentUser]);

    //console.log("ENROLLMENTS", enrollments)



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
                            enrollments={enrollments}
                            enrolling={enrolling} 
                            setEnrolling={setEnrolling} /> </ProtectedRoute>} />
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
