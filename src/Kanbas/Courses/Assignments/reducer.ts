import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: [],
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        /*
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
        
                //    {/*state.assignments.push(newAssignment); */ //}
        //},

        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course,
                available: assignment.available,
                due: assignment.due,
                points: assignment.points,
                available_raw: assignment.available_raw,
                due_raw: assignment.due_raw,
                description: assignment.description,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },

        /*
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(assignment => assignment._id !== assignmentId);
        },
        */

        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (m: any) => m._id !== assignmentId);
        },


        /*
                updateAssignment: (state, { payload: module }) => {
                    state.assignments = state.assignments.map((m: any) =>
                        m._id === module._id ? module : m
                    ) as any;
                },
                */

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignment._id ? assignment : m
            ) as any;
        },

    },
});
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;