import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: any) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item">
            {todo.title} <span className="right-text-margin"></span>
            <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="btn btn-primary m-1"> Edit </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="btn btn-danger m-1"> Delete </button>
        </li>
    );
}
