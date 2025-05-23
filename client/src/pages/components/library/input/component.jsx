import styles from './styles.module.css'

const Input = ({label, children, ...props }) => {
  return (
    <div className={ styles.wrapper }>
      {label && <label className={ styles.label }>{ label }</label>}
      <input className={ styles.input } { ...props }>
        { children }
      </input>
    </div>
  )
} 
export default Input