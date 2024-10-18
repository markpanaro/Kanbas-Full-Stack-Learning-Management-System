export default function TodoForm({ todo, setTodo, addTodo, updateTodo }: {
    todo: { id: string; title: string };
    setTodo: (todo: { id: string; title: string }) => void;
    addTodo: (todo: { id: string; title: string }) => void;
    updateTodo: (todo: { id: string; title: string }) => void;
}) {
    return (
        <li className="list-group-item">
            <input value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            <button onClick={() => updateTodo(todo)}
                id="wd-update-todo-click" className="btn btn-warning m-2"> Update </button>
            <button onClick={() => addTodo(todo)}
                id="wd-add-todo-click" className="btn btn-success"> Add </button>
        </li>
    );
}
