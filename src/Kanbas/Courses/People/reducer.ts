import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: { user, course } }) => {
            console.log("user:", user);
            console.log("course:", course);
            const newEnrollment: any = {
                _id: new Date().getTime().toString(),
                user: user,
                course: course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: { user, course } }) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => enrollment.user !== user || enrollment.course !== course
            );
        },
    },
});
export const { addEnrollment, deleteEnrollment } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;