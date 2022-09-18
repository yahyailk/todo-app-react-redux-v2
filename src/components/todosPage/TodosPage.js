import React from 'react'
import AddTodo from './AddTodo'
import Sections from './Sections'
import Todos from './Todos'
import Header from './Header'

const TodosPage = () => {
  return (
    <>
      <Header />
      <AddTodo />
      <Sections />
      <Todos />
    </>
  )
}

export default TodosPage