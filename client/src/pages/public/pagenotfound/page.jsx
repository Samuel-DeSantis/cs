import Footer from '../../components/library/footer/component';
import NavBar from '../../components/library/navbar/component'

import styles from './styles.module.css'

const PageNotFound = () => {
  return (
    <>
      <NavBar />
      <div className={ styles.pageNotFound }>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
      <Footer />
    </>

  );
}
export default PageNotFound