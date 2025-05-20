import { Outlet } from 'react-router-dom'

import NavBar from '../components/library/navbar/component'
import Footer from '../components/library/footer/component'

import styles from './layout.module.css'

const Layout = () => {
	return (
		<div className={ styles.container }>
			<NavBar />
			<main className={ styles.main }>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
export default Layout