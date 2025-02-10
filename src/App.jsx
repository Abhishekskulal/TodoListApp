import Navbar from "./components/Navbar"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  const handleChange = (e)=>{
    settodo(e.target.value)
  }
  const handleAdd = ()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
  }
  const handleCheck = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    const newTodos = [...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    settodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto w-[90%] my-5 bg-violet-100 rounded-2xl p-5 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="bg-white text-black border w-1/2 border-black rounded-sm px-1.5" />
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 rounded-md p-2 py-1 text-white text-sm font-bold cursor-pointer mx-4">Add</button>
        </div>
        <h1 className="text-xl">Your todo</h1>
        <div className="todos">
          {todos.map(item => {
            return <div key={item.id} className="todo flex w-1/4 justify-between my-3">
              <input onChange={handleCheck} type="checkbox" value={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>
                {item.todo}
              </div>
              <div className="btn">
                <button onClick={handleEdit} className="bg-violet-800 hover:bg-violet-950 rounded-md p-1 py-0.5 text-white text-sm font-bold cursor-pointer mx-1">Edit</button>
                <button onClick={handleDelete} className="bg-red-700 hover:bg-red-800 rounded-md p-1 py-0.5 text-white text-sm font-bold cursor-pointer mx-1">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
