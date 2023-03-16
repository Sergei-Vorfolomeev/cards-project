import React, { useEffect } from 'react'
import './App.css'
import { RoutesComponent } from '../common/components/routes/RoutesComponent'
import { Header } from '../features/header/Header'
import { useAppDispatch } from './store'
import { meTC } from '../features/login/authReducer'

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <RoutesComponent />
    </div>
  )
}


