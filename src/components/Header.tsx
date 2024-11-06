import { ChangeEvent, SyntheticEvent, useState } from "react";
import { createNewTodo, Todo } from "src/redux/counterSlice";
import { useAppDispatch } from "src/redux/hooks";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const [nameTodo, setNameTodo] = useState('')
  const dispatch = useAppDispatch()
  const handleAddTodo = (event: SyntheticEvent) => {
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
    <header className="header">
      <h1 className="title-app">todos</h1>
      <div>
        <input onKeyDown={handleAddTodo} value={nameTodo} onChange={handleChangeName} type="text" className="create-input-todo" placeholder="What needs to be done?" />
      </div>
    </header>
  )
}

export default Header
