import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeFilter } from "../../redux/todosSlice"

const Sections = () => {

    const dispatch = useDispatch()

    const isDarkMode = useSelector((state) => state.theme.isDarkMode)

    return (
        <div className='non-bootstrap-container' >
            <div className={isDarkMode ? "card dark-mode-card" : "card"}>
                <div className='card-header'>
                    <button className="btn btn-primary" onClick={() => dispatch(changeFilter("all"))}>All</button>
                    <button className="btn btn-warning" onClick={() => dispatch(changeFilter("active"))}>Actives</button>
                    <button className="btn btn-success" onClick={() => dispatch(changeFilter("completed"))}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default Sections