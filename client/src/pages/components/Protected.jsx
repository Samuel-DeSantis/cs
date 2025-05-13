import { Outlet, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import NavBar from './NavBar';

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
      <NavBar />
      <Outlet />
    </>
  )
}
export default Protected;