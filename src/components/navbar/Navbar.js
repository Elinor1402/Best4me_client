import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import { FaPollH, FaBars, FaTimes } from 'react-icons/fa'; /* importing logo and menu changing logos from react icons fontawesome or using 'fas' to get logo from a link in public folder->index */
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false); /* Declare a "click" state variable with initial state "false" and returns current state and function that updates it*/
  // const [button, setbutton] = useState(true); /* same as above for "button" */

  const handleClick = () => setClick(!click); /* function that toggles the click event */
  const closeMobileMenu = () => setClick(false); /* same as above */

  return (
    <>
        <nav className='navbarr'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Best4Me
              <i class='fas fa-poll-h' />
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}> {/* in mobile it turns to true and show active menu and after select (event) it turn to false and closes else its the regular menu */}
                <li className='nav-item'>
                  <Link to='/admin' className='nav-links' onClick={closeMobileMenu}>
                    Admin
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                    Sign Up
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/log-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar