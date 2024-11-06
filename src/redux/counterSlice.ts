import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string,
  name: string
  isCompleted: boolean
}

const initialState: {
  filter: string,
  todoList: Todo[]
} = {
  filter: 'All',
  todoList: [
  ]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createNewTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList.push(action.payload)
    },
    clearCompletedTodos: (state) => {
      state.todoList = state.todoList.filter(t => !t.isCompleted)
    },
    changeStatusTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todoList.find(td => td.id === action.payload.id)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
    setAllTodoCompleted: (state) => {
      const allCompleted = state.todoList.every(td => td.isCompleted === true);
      const allNotCompleted = state.todoList.every(td => td.isCompleted === false);
    
      if (!allCompleted && !allNotCompleted) {
        state.todoList.forEach(td => {
          if (td.isCompleted === false) {
            td.isCompleted = true;
          }
        });
      } else if (allCompleted) {
        state.todoList.forEach(td => {
          td.isCompleted = false;
        });
      } else if (allNotCompleted) {
        state.todoList.forEach(td => {
          td.isCompleted = true;
        });
      }
    },
    changeStatusFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
    changeNameTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todoList.find(td => td.id === action.payload.id)
      if (todo) {
        todo.name = action.payload.name
      }
    },
    deleteOneTodo: (state, action: PayloadAction<Todo>) => {
      console.log(action)
      const indexDelete = state.todoList.findIndex(td => td.id === action.payload.id)
      state.todoList.splice(indexDelete, 1)
    },
  }
})

export const {
  createNewTodo,
  changeStatusTodo,
  setAllTodoCompleted,
  changeStatusFilter,
  clearCompletedTodos,
  changeNameTodo,
  deleteOneTodo
 } = todoSlice.actions

export default todoSlice.reducer