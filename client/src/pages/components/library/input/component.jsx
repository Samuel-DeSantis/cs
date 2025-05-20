import styles from './input.module.css'

const Input = ({label, children, ...props }) => {
  return (
    <div className={ styles.inputWrapper }>
      {label && <label className={ styles.label }>{ label }</label>}
      <input className={ styles.input } { ...props }>
        { children }
      </input>
    </div>
  )
} 
export default Input