import { Link } from "react-router-dom";

const NavBar = () => {

  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/sign_in'
  }

  return (
    <nav>
      <Link to='/'>Home</Link>
      { token ? (<>
        <Link to='/projects'>Projects</Link>
        <Link to='/profile'>Profile</Link>
        <a href="#" onClick={ logout }>Logout</a>
      </>) : (<>
        <Link to='/sign_in'>Sign In</Link>
        <Link to='/sign_up'>Sign Up</Link>
      </>) }
    </nav>
  )
}

export default NavBar