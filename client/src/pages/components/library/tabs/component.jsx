import { Link, Outlet, useLocation } from "react-router-dom"

import styles from './styles.module.css'

const Tabs = ({ path, tabs }) => {
  const location = useLocation()

  return (
    <>
      <nav className={ styles.nav }>
        {tabs.map((tab, index) => {
          const isActive = location.pathname === `${ path }/${ tab.url }`
          return <Link 
          key={ index }
            to={ `${ path }/${ tab.url }` }
            className={ `${ styles.link } ${ isActive ? styles.active: '' }` }
          >{ tab.label }</Link>
        })}
      </nav>
      <Outlet />
    </>
  )
}

export default Tabs