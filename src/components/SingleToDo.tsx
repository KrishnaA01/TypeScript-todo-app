import React, { useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './style.css';
import TodoList from './TodoList';


type Props = {
  todo: Todo,
  todos:  Todo[];
  setTodos : React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

export const SingleToDo = ({ todo, todos, setTodos }: Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone=(id: number)=>{
    setTodos(todos.map((todo)=> todo.id === id?{...todo, isDone:!todo.isDone} : todo))
  }
  const handleDelete= (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id ))
  }
  // filter method returns whatever condition is true. Here we want what is not true.
// *******************************************EDIT****************************************


  return <form className='todos__single'>
    {todo.isDone ? (
      <s className='todos__single__text'>{todo.todo}</s>
    ):
    (<span className="todos__single__text">{todo.todo}</span>)
    
    }
    <div>
      <span className="icon"> <AiFillEdit /> </span>
      <span className="icon" onClick={()=>handleDelete(todo.id)} > <AiFillDelete /></span>
      <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone /></span>
    </div>

  </form>
   
}
