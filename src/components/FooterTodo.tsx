import { useState } from "react"
import { changeStatusFilter, clearCompletedTodos } from "src/redux/counterSlice"
import { useAppDispatch, useAppSelector } from "src/redux/hooks"

const FooterTodo = () => {
  const dispatch = useAppDispatch()
  const bigState = useAppSelector(state => state.todos)
  const [typeFilter, setTypeFilter] = useState(bigState.filter)
  let quantity
  const countIncompleted = bigState.todoList.filter(td => !td.isCompleted).length
  if (countIncompleted === 1) {
    quantity = '1 item left!'
  }
  else {
    quantity = `${countIncompleted} items left!`
  }
  const handleChangefilter = (status: string) => {
    setTypeFilter(status)
    dispatch(changeStatusFilter(status))
  }
  const clearCompleted = () => {
    dispatch(clearCompletedTodos())
  }
  return (
    <footer className="footer-todo">
      <span style={{ flexBasis: '84px'}}>{quantity}</span>
      <div className="filter-status">
        <button onClick={() => handleChangefilter('All')} className={`${typeFilter === 'All' ? 'toggle-status' : ''}`}>All</button>
        <button onClick={() => handleChangefilter('Active')} className={`${typeFilter === 'Active' ? 'toggle-status' : ''}`}>Active</button>
        <button onClick={() => handleChangefilter('Completed')} className={`${typeFilter === 'Completed' ? 'toggle-status' : ''}`}>Completed</button>
      </div>
      <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}

export default FooterTodo
