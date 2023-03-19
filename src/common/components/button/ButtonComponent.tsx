import React from 'react'
import styles from './Button.module.css'

type ButtonPropsType = {
  name: string
  callBack: () => void
}
export const ButtonComponent = ({ name, callBack }: ButtonPropsType) => {
  const onClickHandler = () => {
    callBack()
  }

  return (
    <div>
      <button onClick={onClickHandler} type={'button'} className={styles.btn}>
        {name}
      </button>
    </div>
  )
}
