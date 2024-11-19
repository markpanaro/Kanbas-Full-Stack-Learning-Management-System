import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const existingIndex = state.assignments.findIndex(a => a._id === assignment._id);
            if (existingIndex !== -1) {
                state.assignments[existingIndex] = assignment;
            } else {
                state.assignments.push({
                    _id: assignment._id || new Date().getTime().toString(),
                    ...assignment,
                });
            }

            {/*state.assignments.push(newAssignment); */ }
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(assignment => assignment._id !== assignmentId);
        },
        updateAssignment: (state, { payload: module }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === module._id ? module : m
            ) as any;
        },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;