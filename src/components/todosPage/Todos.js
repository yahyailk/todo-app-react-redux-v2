import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTodos, deleteTodo, updateTodo, completeTodo } from '../../redux/todosSlice'
import { faCheck, faPen, faTrashCan, faX} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import gif from '../../loading-gif.gif'

let filtered = [];

const Todos = () => {
    const dispatch = useDispatch()

    const todos = useSelector((state) => state.todo.todos)
    const isLoading = useSelector((state) => state.todo.isLoading)
    const error = useSelector((state) => state.todo.error)
    const activeFilter = useSelector((state) => state.todo.activeFilter)
    const deleteTodoLoading = useSelector((state) => state.todo.deleteTodo.isLoading)
    const updateTodoLoading = useSelector((state) => state.todo.updateTodo.isLoading)
    const completeTodoLoading = useSelector((state) => state.todo.completeTodo.isLoading)
    const isDarkMode = useSelector((state) => state.theme.isDarkMode)

    const itemsLeft = todos.filter(todo => !todo.isCompleted).length

    const [edit, isEditting] = useState(false)
    const [todoId, setTodoId] = useState("")
    const [updatedTodo, setUpdatedTodo] = useState("")

    useEffect(() => {
        dispatch(getTodos())
    },[dispatch])

    const handleDestroy = async (id) => {
        if(window.confirm("Do you want to delete todo?")){
            await dispatch(deleteTodo(id))
        }
    }

    const handleEdit = async (id, content) => {
        await dispatch(updateTodo({id, data:{ content }}))
        isEditting(false)
    }

    const handleComplete = async (id, isCompleted) => {
        await dispatch(completeTodo({id, data: {isCompleted}}))
    }

    filtered = todos;
    if(activeFilter == "all"){
        filtered = todos
    }if(activeFilter == "active") {
        filtered = todos.filter((todo) => todo.isCompleted === false)
    }if(activeFilter == "completed") {
        filtered = todos.filter((todo) => todo.isCompleted === true)
    }

    return (
        <>
            <div className={isDarkMode ?'non-bootstrap-container tasks dark-mode-tasks' :'non-bootstrap-container tasks'}>
                <ul>
                    {isLoading ? <div className='get-todo-loading'><img src={gif} className="get-todo-loading-gif"/></div> : ""}
                    {error && <div className='getTodos-error'>{error}</div>}
                    {
                        filtered.map((todo, index) => (
                            <li key={todo.id}>
                                <div className='task-title'>
                                    <span>{index +1}. </span>
                                    <span className=''>{todo.content}</span>
                                    {todo.isCompleted ? <FontAwesomeIcon className='completed-check' icon={faCheck}/> : ""}
                                </div>
                                {edit && todoId == todo.id && (
                                    <div className='edit-form'>
                                        <input type="text" placeholder='Edit Todo' onChange={(e) => setUpdatedTodo(e.target.value)}/>
                                        <button className='btn btn-success' onClick={() => handleEdit(todo.id, updatedTodo)}>{updateTodoLoading ? <img src={gif} className="loading-gif"/> : <FontAwesomeIcon icon={faCheck}/>}</button>
                                        <button className='btn btn-danger' onClick={() => isEditting(false)}><FontAwesomeIcon icon={faX} /></button>
                                    </div>
                                )}
                                <div className={activeFilter === "completed" ? "none-buttons" : "buttons"}>
                                    <button className='btn btn-success' onClick={() => {
                                        handleComplete(todo.id, !todo.completed)
                                        setTodoId(todo.id)
                                    }}>{completeTodoLoading && todoId == todo.id ? <img src={gif} className="loading-gif"/> : <FontAwesomeIcon icon={faCheck}/>}</button>
                                    <button className='btn btn-warning' onClick={() => {
                                        isEditting(true)
                                        setTodoId(todo.id)
                                    }}><FontAwesomeIcon icon={faPen}/></button>
                                    <button className='btn btn-danger' onClick={() => {
                                        handleDestroy(todo.id)
                                        setTodoId(todo.id)
                                    }}>{deleteTodoLoading && todoId == todo.id ? <img src={gif} className="loading-gif"/> : <FontAwesomeIcon icon={faTrashCan}/>}</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={isDarkMode ? 'non-bootstrap-container task-left dark-mode-task-left' : 'non-bootstrap-container task-left'}>
                <div className='card card-footer'>
                    <p>{itemsLeft} todo{itemsLeft > 1 ? "s" : ""} left</p>
                </div>
            </div>
        </>
    )
}

export default Todos