import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loginTC } from './authReducer'
import { Navigate } from 'react-router-dom'
import { Button } from '../../common/components/button/Button'

export const Login = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const dispatch = useAppDispatch()

  if (isAuth) return <Navigate to={'/profile'} />
  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .max(25, 'Password must be 25 characters or less')
          .min(5, 'Password must be 5 characters or more')
          .required('Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        dispatch(loginTC(values))
      }}
    >
      <Form>
        <div>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
        </div>

        <div>
          <label htmlFor="rememberMe">Remember me</label>
          <Field name="rememberMe" type="checkbox" />
          <ErrorMessage name="rememberMe" />
        </div>

        <div>
          <span onClick={() => <Navigate to={'/recover-password'} />}>Forgot password?</span>
        </div>

        <button type="submit">Sign In</button>

        <div>Already have an account?</div>
        <Button name={'Sign Up'} callBack={() => <Navigate to={'/registration'} />} />
      </Form>
    </Formik>
  )
}
