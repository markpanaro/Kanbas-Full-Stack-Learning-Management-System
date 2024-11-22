import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {


        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },




        addEnrollment: (state, { payload: { userId, courseId } }) => {
            console.log("user:", userId);
            console.log("course:", courseId);
            const newEnrollment: any = {
                _id: new Date().getTime().toString(),
                user: userId,
                course: courseId,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: { userId, courseId } }) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
            );
        },
    },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;