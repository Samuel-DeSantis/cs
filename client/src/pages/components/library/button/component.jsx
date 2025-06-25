import styles from './styles.module.css'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  
  const styling = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={ styling } 
      disabled={ disabled }
      type={ type }
      { ...props }
    >
      { children }
    </button>
  )
}

export default Button