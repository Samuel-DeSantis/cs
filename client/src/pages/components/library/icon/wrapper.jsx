const IconWrapper = ({ path, className = '' }) => {
  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`transition-colors duration-200 ease-in-out text-neutral-950 dark:text-neutral-50 ${className}`}
    ><path d={path} fill='currentColor' />
    </svg>
  )
}

export default IconWrapper