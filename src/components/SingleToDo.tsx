import React, { useState, useRef } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './style.css';
import TodoList from './TodoList';
import { useEffect } from 'react';


type Props = {
  todo: Todo,
  todos:  Todo[];
  setTodos : React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

export const SingleToDo = ({ todo, todos, setTodos }: Props) => {

  // **************************EDIT Mode*********************************
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleDone=(id: number)=>{
    setTodos(todos.map((todo)=> todo.id === id?{...todo, isDone:!todo.isDone} : todo))
  }

  // filter method returns whatever condition is true. Here we want what is not true.
  const handleDelete= (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id ))
  }

  // **************************EDIT handler*********************************

  const handleEdit =(e:React.FormEvent, idKrishna: number)=> {
      e.preventDefault()
      setTodos(todos.map((todo)=>(
        todo.id === idKrishna ? {...todo, todo:editTodo} : todo
      )));
      setEdit(false)
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  




  return <form className='todos__single' onSubmit={(e)=>handleEdit(e,todo.id)} >
    {
      edit ? (
        <input
        ref={ inputRef }
         value={ editTodo }
         onChange={(e)=>setEditTodo(e.target.value)}
         className="todos__single__text"
         />
      ): (
        todo.isDone ? (
      <s className='todos__single__text'>{todo.todo}</s>
    ):
    (<span className="todos__single__text">{todo.todo}</span>)
    
    
    )
    }
    
    <div>
      <span className="icon" onClick={()=>{
           if(!edit && !todo.isDone){
              setEdit(!edit);
            }
      }
         
      }> <AiFillEdit /> </span>
      <span className="icon" onClick={()=>handleDelete(todo.id)} > <AiFillDelete /></span>
      <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone /></span>
    </div>

  </form>
   
}
