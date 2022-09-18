import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TodosPage from './components/todosPage/TodosPage';
import Page404 from './components/Page404';
import { useSelector } from 'react-redux';

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  return (
    <div className={isDarkMode ? "dark-mode-bg" : ""}>
      <Router>
        <Routes>
          <Route path='/' element={ <LoginPage /> }/>
          <Route path="/todos" element={<TodosPage />}/>
          <Route path="*" element={ <Page404/> }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
