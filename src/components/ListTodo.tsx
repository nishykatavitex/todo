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
  const handleChangeTodoName = (event, todo: Todo) => {
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
    <main className="main-todo">
      <div className="toggle-all-todo">
        <button className='btn-toggle' onClick={handleSetAllTodoStatus}>
          <img src={arrowdown} alt="" />
        </button>
      </div>
      <ul>
        {getTodoByStatus(listTodo)!.map(t => (
          <li className='todo-li' key={t.id} onDoubleClick={() => handleDoubleClick(t.id)}>
            <div className='one-todo'>
              <div className='status-todo' onDoubleClick={(e) => e.stopPropagation()}>
                {!t.isCompleted
                ? <div className='circle-status' onClick={() => handleChangeStatus(t)}></div>
                : <div className='circle-status-done' onClick={() => handleChangeStatus(t)}>&#10004;</div>}
              </div>
              <p className={`name-todo ${t.isCompleted && 'isCompleted'}`}>{t.name}</p>
              <button onDoubleClick={(e) => e.stopPropagation()} onClick={() => handleDeleleTodo(t)} className='delete-btn'></button>
            </div>
          { openInputId === t.id && <input
          onKeyDown={(e) => handleChangeTodoName(e, t)}
          onBlur={handleBlur}
          value={newNameTodo || t.name}
          onChange={handleChangeName}
          type="text"
          autoFocus
          className={`change-input-todo ${openInputId && 'open'}`}
          placeholder="" />}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ListTodo
