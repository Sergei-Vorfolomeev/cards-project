import React from 'react'

import styles from './Button.module.css'

type ButtonPropsType = {
  name: string
  callBack: () => void
  style?: {}
}
export const ButtonComponent = ({ name, callBack, style }: ButtonPropsType) => {
  const onClickHandler = () => {
    callBack()
  }

  return (
    <div>
      <button onClick={onClickHandler} type={'button'} className={styles.btn} style={style}>
        {name}
      </button>
    </div>
  )
}
