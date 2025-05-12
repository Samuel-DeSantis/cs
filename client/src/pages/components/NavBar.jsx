import { Link } from "react-router-dom";

const NavBar = () => {
  return(
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/sign_in'>Sign In</Link>
      <Link to='/sign_up'>Sign Up</Link>
    </nav>
  )
}

export default NavBar