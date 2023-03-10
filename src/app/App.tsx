import React, { useEffect } from 'react'
import './App.css'
import { PATH, RoutesComponent } from '../common/components/routes/RoutesComponent'
import { Header } from '../features/header/Header'
import { useAppDispatch, useAppSelector } from './store'
import { meTC } from '../features/login/authReducer'
import { Navigate, useNavigate } from 'react-router-dom'

function App() {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  // isAuth && navigate(PATH.PROFILE)

  return (
    <div className="App">
      <Header />
      <RoutesComponent />
      {/*{!isAuth && <Navigate to={PATH.LOGIN} />}*/}
    </div>
  )
}

export default App
