import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'

type BasicModalPropsType = {
  childrenCall: (handleOpen: () => void) => ReactNode
  children: (handleClose: () => void) => ReactNode
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}

export const BasicModal: FC<BasicModalPropsType> = ({ children, childrenCall }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {childrenCall(handleOpen)}
      {/*<img src={icon} alt={'icon'} onClick={handleOpen} />*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children(handleClose)}</Box>
      </Modal>
    </>
  )
}
