import React, { useEffect } from 'react'

import './App.css'
import { useSelector } from 'react-redux'

import { useAppDispatch } from './store'

import { initializeAppTC } from 'app/appReducer'
import { getIsInitializeSelector } from 'app/appSelectors'
import { Loader } from 'common/components/loader/Loader'
import { RoutesComponent } from 'common/components/routes/RoutesComponent'
import { Header } from 'features/header/Header'

export function App() {
  const isInitialize = useSelector(getIsInitializeSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  if (!isInitialize) return <Loader />

  return (
    <div className="App">
      <Header />
      <RoutesComponent />
    </div>
  )
}
