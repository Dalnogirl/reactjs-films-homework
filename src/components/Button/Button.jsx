import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'

const Button = ({width, children, onClick}) => (
    <div
        className={styles.button}
        style={{width}}
        onClick={onClick}
    >
      {children}
    </div>
)

Button.propTypes = {
    width: PropTypes.number,
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
    width: null,
    children: null,
}

export default Button
