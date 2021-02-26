import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { useDispatch, useSelector } from 'react-redux'
import { getErrorMessage } from '../../redux/selectors/selectors'
import { appActions } from '../../redux/appReducer'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

export default function AlertDialogSlide() {
  const dispatch = useDispatch()
  const errorMessage = useSelector(getErrorMessage)
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
    dispatch(appActions.setError(null))
  }
  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{errorMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
