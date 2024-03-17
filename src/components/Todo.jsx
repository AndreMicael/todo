import style from './Todo.module.css';

const Todo = ({ todo, completeTodo, removeTodo }) => {
  return (
    <div key={todo.id} className={style.todo} style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
      <div className={style.content}>
        <p className={style.title}>{todo.text}</p>
        <div className={style.buttons}>
          <button onClick={() => completeTodo(todo.id, todo.isCompleted)} className={style.complete}>Completar</button>
          <button onClick={() => removeTodo(todo.id)} className={style.delete}>X</button>
        </div>
        <p className={style.category}>({todo.category})</p>
      </div>
    </div>
  );
};

export default Todo;
