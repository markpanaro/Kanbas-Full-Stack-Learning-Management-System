import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: new Date().getTime().toString(),
                title: quiz.title,
                course: quiz.course,
                available: quiz.available,
                due: quiz.due,
                points: quiz.points,
                description: quiz.description,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },

        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (m: any) => m._id !== quizId);
        },

        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quiz._id ? quiz : m
            ) as any;
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
    quizzesSlice.actions;
export default quizzesSlice.reducer;