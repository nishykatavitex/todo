import { ChangeEvent, useState } from "react";
import { createNewTodo, Todo } from "src/redux/counterSlice";
import { useAppDispatch } from "src/redux/hooks";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const [nameTodo, setNameTodo] = useState('')
  const dispatch = useAppDispatch()
  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      if (nameTodo.length === 1) {
        return
      }
      const newTodo: Todo = {
        id: uuidv4(),
        name: nameTodo,
        isCompleted: false
      }
      dispatch(createNewTodo(newTodo))
      setNameTodo('')
    }
  }
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameTodo(event.target.value)
  }
  return (
    <header>
      <h1 className="absolute w-full text-center text-[#b83f45] text-[80px] top-[-110px] font-medium">todos</h1>
      <div>
        <input
          onKeyDown={handleAddTodo}
          value={nameTodo}
          onChange={handleChangeName}
          type="text"
          className="input-todo placeholder:italic placeholder:text-2xl placeholder:text-[#9e9e9e]"
          placeholder="What needs to be done?"
        />
      </div>
    </header>
  )
}

export default Header
