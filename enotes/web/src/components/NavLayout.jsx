import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NavLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark' className='px-5'>
        <Navbar.Brand as={Link} to='/'>eNotes</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/' className={`${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
          <Nav.Link as={Link} to='/about' className={`${location.pathname === '/about' ? 'active' : ''}`}>About</Nav.Link>
        </Nav>
        {!user?.isAuthenticated
          ? (
            <>
              <Nav.Link as={Link} to='/login' className={`text-white mx-4 ${location.pathname === '/login' ? 'active' : ''}`}>Login</Nav.Link>
              <Nav.Link as={Link} to='/signup' className={`text-white ${location.pathname === '/signup' ? 'active ' : ''}`}>Sign Up</Nav.Link>
            </>
            )
          : (
            <Nav.Link as={Link} className='text-white' onClick={handleLogoutClick}>Logout</Nav.Link>
            )}
      </Navbar>
    </>
  );
};

export default NavLayout
;
