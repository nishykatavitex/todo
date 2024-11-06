import Header from './components/Header'
import ListTodo from './components/ListTodo'
import FooterTodo from './components/FooterTodo'
import Footer from './components/Footer'
import './index.css'
import { useAppSelector } from './redux/hooks'

function App() {
  const todos: number = useAppSelector(state => state.todos.todoList).length
  return (
    <>
      <section className='todo-container'>
        <Header/>
        {todos !== 0
        && <>
          <ListTodo/>
          <FooterTodo/>
        </>}
      </section>
      <Footer/>
    </>
  )
}

export default App
