import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loginTC } from './authReducer'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { Loader } from '../../common/components/loader/Loader'
// import passwordEye from '../../common/assets/pictures/eye.svg'
// import passwordEyeHide from '../../common/assets/pictures/eye-off.svg'
import { Error } from '../../common/components/error/Error'

const SignupSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required field'),
  password: Yup.string()
    .max(25, 'Password must be 25 characters or less')
    .min(5, 'Password must be 5 characters or more')
    .required('Required field'),
})

export const Login = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const loading = useAppSelector(state => state.registrationReducer.loading)
  const errorMessage = useAppSelector<string>(state => state.app.errorMessage)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isHidden, setIsHidden] = useState<boolean>(true)

  const imgOnClickHandler = () => {
    setIsHidden(!isHidden)
  }

  if (isAuth) {
    navigate('/profile')
  }
  return (
    <div>
      <div className={styles.login}>
        {loading && <Loader />}
        <h2>Sign In</h2>
        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(loginTC(values))
            resetForm()
          }}
        >
          <Form>
            <div className={styles.loginInputContainer}>
              <label htmlFor="email" className={styles.loginInputLabel}>
                Email
              </label>
              <Field name="email" type="email" className={styles.loginInput} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.loginInputContainer}>
              <label htmlFor="password" className={styles.loginInputLabel}>
                Password
              </label>
              <Field
                name="password"
                type={isHidden ? 'password' : 'text'}
                className={styles.loginInput}
              />
              {isHidden ? (
                <img
                  className={styles.registrationEye}
                  src={"passwordEye"}
                  onClick={imgOnClickHandler}
                />
              ) : (
                <img
                  className={styles.registrationEye}
                  src={"passwordEyeHide"}
                  onClick={imgOnClickHandler}
                />
              )}
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <div className={styles.checkBoxContainer}>
              <Field
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className={styles.loginCheckbox}
              />
              <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
                Remember me
              </label>
              <ErrorMessage name="rememberMe" />
            </div>

            <div className={styles.forgotPasswordContainer}>
              <NavLink to={'/recover-password'} className={styles.forgotPassword}>
                Forgot Password?
              </NavLink>
            </div>

            <button type="submit" className={styles.btn}>
              Sign In
            </button>

            <div className={styles.haveAccount}>Already have an account?</div>
            <p className={styles.signUpBox}>
              <NavLink to={'/registration'} className={styles.signUpLink}>
                Sign Up
              </NavLink>
            </p>
          </Form>
        </Formik>
      </div>
      {errorMessage && <Error message={errorMessage} />}
    </div>
  )
}
