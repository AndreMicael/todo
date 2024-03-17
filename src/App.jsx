import { useState, useEffect } from 'react'
import style from './App.module.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'

const url = 'https://todo-jsonserver.vercel.app/tasks'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    }

    fetchData();
  }, []);

  const AddTodo = async (title, category) => {
    const newTodo = {
      id: (Math.floor(Math.random() * 10000)).toString(),
      text: title,
      category,
      isCompleted: false,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });
    if (!response.ok) {
      console.error('Erro ao adicionar a nova tarefa');
      return;
    }
    setTodos([...todos, newTodo]);
  }

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir a tarefa.');
      }
  
      // Atualiza a lista de tarefas após a remoção bem-sucedida
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  const completeTodo = async (id, isCompleted) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa.');
      }
  
      // Atualiza o estado local após a atualização bem-sucedida
      setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id === id) {
          // Atualiza apenas a propriedade isCompleted
          return { ...todo, isCompleted: !isCompleted };
        }
        return todo;
      }));
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
    }
  }
  
 
  
  
  

  return (
    <div className={style.app}>
      <h1>Lista de Tarefas</h1>
      <div className={style.todo_list}>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo}/>
        ))}
      </div>
      <TodoForm addTodo={AddTodo}  />
    </div>
  )
}

export default App
