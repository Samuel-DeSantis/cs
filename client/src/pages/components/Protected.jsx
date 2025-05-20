import { Outlet, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import NavBar from '../components/library/navbar/component';
import Footer from '../components/library/footer/component';
import Layout from '../layouts/layout';

const Protected = () => {

  const token = localStorage.getItem('token')

  const isTokenValid = () => {
    if (!token) return false

    try {
      const decoded = jwtDecode(token)
      const now = Date.now() / 1000
      return decoded.exp > now
    } catch (err) {
      return false
    }
  }

  if (!isTokenValid()) {
    // Optionally clear invalid token
    localStorage.removeItem('token')
    return <Navigate to="/sign_in" />
  }

  return (
    <>
      <Layout />
      {/* <NavBar />
      <Outlet />
      <Footer /> */}
    </>
  )
}
export default Protected;