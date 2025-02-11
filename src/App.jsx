import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const toggle = () => { 
    setshowFinished(!showFinished)
   }


  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodo = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodo)
    saveToLs()
  }
  const handleDelete = (e, id) => {

    let newTodo = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodo)
    saveToLs()
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLs()
  }
  const handleCheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLs()
  }

  return (
    <>
      <Navbar />
      <div className="mx-4 md:container md:mx-auto  my-7 bg-violet-100 rounded-2xl p-5 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">uTodo- Manage your task at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-mono ml-2 mb-[-5px]">Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="bg-white text-black border border-zinc-950 rounded-full px-5 py-1 w-full" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 select-none disabled:bg-violet-600 disabled:pointer-events-none hover:bg-violet-950 rounded-full px-3 py-1 text-white text-sm font-bold cursor-pointer mx-1">Save</button>
          </div>
        </div>
        <input className="my-4 ml-2" onChange={toggle} type="checkbox" checked={showFinished} name="" id="" /><span className=" ml-3 font-semibold">Show Finished</span> 
        <div className="h-[1px] w-[90%] bg-black opacity-40 mx-auto my-2"></div>
        <h1 className="text-lg font-bold ml-2">Your todo</h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display;</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-full rounded-sm justify-between my-3 bg-white p-2">
              <div className="flex gap-5">
                <input onChange={handleCheck} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="btn flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 rounded-md p-1 py-0.5 text-white text-sm font-bold cursor-pointer mx-1"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-red-700 hover:bg-red-800 rounded-md p-1 py-0.5 text-white text-sm font-bold cursor-pointer mx-1"><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
