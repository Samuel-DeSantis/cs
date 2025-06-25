import styles from './styles.module.css'

const Alert = ({ children, variant = 'info', onClose }) => {

  const styling = [
    styles.alert,
    styles[variant],
    onClose ? styles.dismissible : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={ styling } role="alert">
      <span>{ children }</span>
        {onClose && (
          <button
            className={ styles.closeButton }
            onClick={ onClose }
            aria-label="Close alert"
          >
            x
          </button>
        )}
    </div>
  )
}

export default Alert