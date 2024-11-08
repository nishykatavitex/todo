import Header from './components/Header'
import ListTodo from './components/ListTodo'
import FooterTodo from './components/FooterTodo'
import Footer from './components/Footer'
import { useAppSelector } from './redux/hooks'

function App() {
  const todos: number = useAppSelector(state => state.todos.todoList).length
  return (
    <>
      <section className='relative max-w-[550px] min-w-[-230px] mt-[130px] mx-auto mb-10 bg-white shadow-section *:relative *:z-[2]'>
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
