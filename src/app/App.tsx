import React, { useEffect } from 'react'
import './App.css'
import { RoutesComponent } from '../common/components/routes/RoutesComponent'
import { Header } from '../features/header/Header'
import { useAppDispatch, useAppSelector } from './store'
import { Login } from '../features/login/Login'
import { meTC } from '../features/login/authReducer'

function App() {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  return (
    <div className="App">
      {/*<Header />*/}
      <RoutesComponent />
      {isAuth && <Login />}
    </div>
  )
}

export default App
