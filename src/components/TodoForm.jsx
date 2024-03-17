import style from './TodoForm.module.css'
import { useState } from 'react'

const TodoForm = ({addTodo}) => {

  const [title, setTitle] = useState('')
  const [category,setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !category) return;
    addTodo(title,category);
    setTitle('')
    setCategory('')

   

  }

  return (
    <div className={style.todo_form}>
      <h2>Criar tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        type="text" 
        placeholder="Digite a sua tarefa."
        />
        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option value=''>Selecione uma categoria</option>
          <option value='Trabalho'>Trabalho</option>
          <option value='Familia'>Família</option>
          <option value='Pesoal'>Pessoal</option>
          <option value='Estudos'>Estudos</option>
          <option value='Freelance'>Freelance</option>
        </select>
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  )
}

export default TodoForm