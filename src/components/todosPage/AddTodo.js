import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from "../../redux/todosSlice"


const AddTodo = () => {
    const dispatch = useDispatch()

    const isLoading = useSelector((state) => state.todo.addTodo.isLoading)
    const addTodoError = useSelector((state) => state.todo.addTodo.error)
    const isDarkMode = useSelector((state) => state.theme.isDarkMode)

    const [content, setNewContent] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(content.length < 3){
            setError("Todo must be more than 3 characters!")
        } else {
            await dispatch(addTodo({content}))
            setNewContent("")
            setError("")
        }
    }

    return (
        <div className={isDarkMode ? "non-bootstrap-container add-task-form dark-mode-add-task-form" : "non-bootstrap-container add-task-form"}>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter Todo...' maxLength={30} value={content} onChange={(e) => setNewContent(e.target.value)}/>
                    <div className='add-button-and-error'>
                        <p className='error text-danger'>{error}</p>
                        {addTodoError && <div className="addTodoError">{addTodoError}</div>}
                        <button type='submit' className='btn btn-primary'>{isLoading ? "Adding Todo..." : "Add Todo"}</button>
                    </div>
                </form>
        </div>
    )
}

export default AddTodo
