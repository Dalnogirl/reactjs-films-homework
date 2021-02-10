import ReactDOM from 'react-dom'
import React from 'react'
import Trailer from '../Trailer/Trailer'

const Modal = ({callback, movieId}) => ReactDOM.createPortal(
    <Trailer callback={callback} movieId={movieId}/>,
    document.querySelector('#app'),
)

export default Modal
