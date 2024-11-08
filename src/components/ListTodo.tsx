import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import arrowdown from '../assets/32px-Arrow-down.svg.png'
import { changeNameTodo, changeStatusTodo, deleteOneTodo, setAllTodoCompleted, Todo } from 'src/redux/counterSlice'
import { ChangeEvent, useState } from 'react'

const ListTodo = () => {
  const dispatch = useAppDispatch()
  const listTodo: Todo[] = useAppSelector(state => state.todos.todoList)
  const filterStatus: string = useAppSelector(state => state.todos.filter)
  const [openInputId, setOpenInputId] = useState<string | null>(null)
  const [newNameTodo, setNewNameTodo] = useState('')
  if (!listTodo) {
    return <div></div>
  }
  const handleChangeStatus = (todo: Todo) => {
    dispatch(changeStatusTodo(todo))
  }
  const handleSetAllTodoStatus = () => {
    dispatch(setAllTodoCompleted())
  }
  const getTodoByStatus = (arr: Todo[]) => {
    switch(filterStatus) {
      case 'All':
        return arr
      case 'Active':
        return arr.filter(td => td.isCompleted === false)
      case 'Completed':
        return arr.filter(td => td.isCompleted === true)
    }
  }
  const handleDoubleClick = (id: string) => {
    setOpenInputId(id)
  }
  const handleChangeTodoName = (event: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    if (event.key === "Enter") {
      dispatch(changeNameTodo({...todo, name: newNameTodo}))
      setOpenInputId(null)
    }
  }
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNameTodo(event.target.value)
  }
  const handleBlur = () => {
    setOpenInputId(null)
  }
  const handleDeleleTodo = (todo: Todo) => {
    dispatch(deleteOneTodo(todo))
  }
  return (
    <main className="border-t border-solid border-t-[#e6e6e6] relative">
      <div className="absolute top-[-60px]">
        <button className='m-[2px] h-14 w-10 flex justify-center items-center focus:shadow-input' onClick={handleSetAllTodoStatus}>
          <img src={arrowdown} alt="" />
        </button>
      </div>
      <ul>
        {getTodoByStatus(listTodo)!.map(t => (
          <li className='border border-[#ededed] relative group' key={t.id} onDoubleClick={() => handleDoubleClick(t.id)}>
            <div className='flex py-3 pr-4 text-2xl items-center'>
              <div className='basis-[40px] shrink-0 flex justify-center mr-5' onDoubleClick={(e) => e.stopPropagation()}>
                {!t.isCompleted
                ? <div className='circle-status' onClick={() => handleChangeStatus(t)}></div>
                : <div className='circle-status border-[#72afa3] flex justify-center items-center text-xl text-[#72afa3] cursor-default' onClick={() => handleChangeStatus(t)}>&#10004;</div>}
              </div>
              <p className={`flex-1 min-w-0 break-words whitespace-normal text-[#484848] ${t.isCompleted ? 'text-[#949494] line-through' : undefined}`}>{t.name}</p>
              <button onDoubleClick={(e) => e.stopPropagation()} onClick={() => handleDeleleTodo(t)}
                className='text-transparent after:content-["×"] group-hover:after:block group-hover:after:h-full group-hover:after:leading-[1.1] group-hover:after:text-[#c18585] group-hover:after:text-[26px]'></button>
            </div>
          { openInputId === t.id && <input
          onKeyDown={(e) => handleChangeTodoName(e, t)}
          onBlur={handleBlur}
          value={newNameTodo || t.name}
          onChange={handleChangeName}
          type="text"
          autoFocus
          className={`input-todo absolute top-0 h-full ${openInputId ? 'block' : 'hidden' }`}
          placeholder="" />}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ListTodo
