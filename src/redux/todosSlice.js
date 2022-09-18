import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk("getTodos", async () => {
    const response = await axios("https://63238c975c1b43572797b818.mockapi.io/todos");
    return response.data;
})

export const addTodo = createAsyncThunk("addTodo", async (data) => {
    const response = await axios.post("https://63238c975c1b43572797b818.mockapi.io/todos", data)
    return response.data
})

export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
    const response = await axios.delete(`https://63238c975c1b43572797b818.mockapi.io/todos/${id}`);
    return response.data;
})

export const updateTodo = createAsyncThunk("updateTodo", async ({id, data}) => {
    const response = await axios.put(`https://63238c975c1b43572797b818.mockapi.io/todos/${id}`, data)
    return response.data
})

export const completeTodo = createAsyncThunk("completeTodo", async ({id, data}) => {
    const response = await axios.put(`https://63238c975c1b43572797b818.mockapi.io/todos/${id}`, data)
    return response.data
})

export const todosSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        activeFilter: "all",
        isLoading: false,
        error: null,
        addTodo: {
            isLoading: false,
            error: null,
        },
        deleteTodo: {
            isLoading: false
        },
        updateTodo: {
            isLoading: false
        },
        completeTodo: {
            isLoading: false
        }
    },
    reducers: {
        changeFilter: (state,action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: {
        // Get Todos
        [getTodos.pending]: (state,action) => {
            state.isLoading = true
        },
        [getTodos.fulfilled]: (state,action) => {
            state.todos = action.payload
            state.isLoading = false
        },
        [getTodos.rejected]: (state,action) => {
            state.isLoading = false
            state.error= action.error.message
        },

        // Add Todo
        [addTodo.pending]: (state,action) => {
            state.addTodo.isLoading = true
        },
        [addTodo.fulfilled]: (state,action) => {
            state.todos.push(action.payload)
            state.addTodo.isLoading = false
        },
        [addTodo.rejected]: (state,action) => {
            state.addTodo.isLoading = false
            state.addTodo.error = action.error.message
        },

        // Delete Todo
        [deleteTodo.pending]: (state,action) => {
            state.deleteTodo.isLoading = true
        },
        [deleteTodo.fulfilled]: (state,action) => {
            const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload.id)
            state.todos = filteredTodos
            state.deleteTodo.isLoading = false
        },

        // Update Todo
        [updateTodo.pending]: (state,action) => {
            state.updateTodo.isLoading = true
        },
        [updateTodo.fulfilled]: (state,action) => {
            const { id, content } = action.payload
            const index = state.todos.findIndex(todo => todo.id === id)
            state.todos[index].content = content
            state.updateTodo.isLoading = false
        },

        // Complete Todo
        [completeTodo.pending]: (state,action) => {
            state.completeTodo.isLoading = true
        },
        [completeTodo.fulfilled]: (state,action) => {
            const { id, isCompleted } = action.payload
            const index = state.todos.findIndex(todo => todo.id === id)
            state.todos[index].isCompleted = isCompleted
            state.completeTodo.isLoading = false
        }
    }
})


export const { changeFilter } = todosSlice.actions
export default todosSlice.reducer
