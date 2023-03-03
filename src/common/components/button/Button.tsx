import React from 'react'

type ButtonPropsType = {
  name: string
  callBack: () => void
}
export const Button = ({ name, callBack }: ButtonPropsType) => {
  const onClickHandler = () => {
    callBack()
  }

  return (
    <div>
      <button onClick={onClickHandler}>{name}</button>
    </div>
  )
}
