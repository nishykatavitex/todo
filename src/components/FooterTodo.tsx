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
    <footer className="flex z-[3] px-[10px] py-[15px] items-center flex-wrap justify-between *:text-[15px] max-450:h-20 max-450:items-start">
      <span className="basis-[84px]">{quantity}</span>
      <div className="max-450-filter-status">
        <button onClick={() => handleChangefilter('All')} className={`${typeFilter === 'All' ? '!border-[#ce4646]' : 'border-transparent'} py-1 px-2 mx-[2px] !border rounded hover:border-[#db7676]`}>All</button>
        <button onClick={() => handleChangefilter('Active')} className={`${typeFilter === 'Active' ? '!border-[#ce4646]' : 'border-transparent'} py-1 px-2 mx-[2px] !border rounded hover:border-[#db7676]`}>Active</button>
        <button onClick={() => handleChangefilter('Completed')} className={`${typeFilter === 'Completed' ? '!border-[#ce4646]' : 'border-transparent'} py-1 px-2 mx-[2px] !border rounded hover:border-[#db7676]`}>Completed</button>
      </div>
      <button className="cursor-pointer hover:underline" onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}

export default FooterTodo
