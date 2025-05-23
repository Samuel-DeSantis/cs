import styles from './styles.module.css'

const Textarea = ({ label, rows = 4, children, ...props }) => {
  return (
    <div className={ styles.wrapper }>
      {label && <label className={ styles.label }>{ label }</label>}
      <textarea className={ styles.textarea } rows={ rows } { ...props }>
        { children }
      </textarea>
    </div>
  )
}

export default Textarea