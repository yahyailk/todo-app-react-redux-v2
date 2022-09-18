import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../../redux/themeSlice'

const Header = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [userNameLS, setUserNameLS] = useState()

  useEffect(()=> {
    const userNameData = JSON.parse(localStorage.getItem("userName"))
    if(userNameData) {
      setUserNameLS(userNameData)
    } 
  }, [])

  const toggleTheme = (e) => {
    dispatch(switchTheme(e.target.checked));
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);


  return (
    <>
        <header className={isDarkMode ? "dark-mode-header": ""}>
          <div className='non-bootstrap-container header'>
            <h1>TODO APP</h1>
            <div className='user-and-modes'>
              <div id="darkmode">
                <input type="checkbox" className="checkbox" id="checkbox" onChange={toggleTheme} checked={isDarkMode}/>
                <label htmlFor="checkbox" className="label">
                  <FontAwesomeIcon icon={faSun}  className="icons"/>
                  <FontAwesomeIcon icon={faMoon} className="icons"/>
                  <div className="ball"></div>
                </label>
              </div>
              <div className='user'>
                <p className='userName'>{userNameLS}</p>
                <FontAwesomeIcon icon={faUser}  className="user-icon"/>
              </div>
            </div>
          </div>
        </header>
        <div className={isDarkMode ? "dark-mode-header-bottom": "header-bottom"}></div>
    </>
  )
}

export default Header