export default function TodoItem({ todo, deleteTodo, setTodo }: {
    todo: { id: string; title: string };
    deleteTodo: (id: string) => void;
    setTodo: (todo: { id: string; title: string }) => void;
}) {
    return (
        <li key={todo.id} className="list-group-item">
            {todo.title} <span className="right-text-margin"></span>
            <button onClick={() => setTodo(todo)}
                id="wd-set-todo-click" className="btn btn-primary m-1"> Edit </button>
            <button onClick={() => deleteTodo(todo.id)}
                id="wd-delete-todo-click" className="btn btn-danger m-1"> Delete </button>
        </li>);
}
