
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between bg-stone-950 text-amber-200 p-3">
        <div>
            <span className="font-bold text-2xl mx-20 select-none">uTodo</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all duration-75">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-75">Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar