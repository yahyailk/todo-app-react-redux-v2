import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  const loginHandle = (e) => {
    e.preventDefault()
    navigate("/todos")
  }

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName))
  }, [userName])

  return (
    <div className={isDarkMode ? "non-bootstrap-container login-container dark-mode-login-container" : "non-bootstrap-container login-container"}>
      <div className='login-card'>
        <h1>TODO APP</h1>
        <form onSubmit={loginHandle}>
          <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} placeholder="Enter user name..."/>
          <button type="submit" className='btn btn-primary'>Confirm</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage