import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useSelector } from 'react-redux';
import './Navigation.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id;
  

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="profile-button-container">
      <div className="profile-button-bars" onClick={toggleMenu}>
        <button onClick={toggleMenu}>
          <FaUserCircle size={25} color='#999'/>
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="profile-menu-list-items">
            <li>Hello, <b>{user.username}</b></li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <hr className='menu-hr' />
             <li><NavLink to={`/users/${userId}`} onClick={closeMenu} className={'manage-jobs-navlink'}>View Profile</NavLink></li>
             <li><NavLink to="/applications" onClick={closeMenu} className={'applications-navlink'}>My Applications</NavLink></li>
             <li><NavLink to="/jobs/my-jobs" onClick={closeMenu} className={'manage-jobs-navlink'}>Manage Jobs</NavLink></li>
             <li><NavLink to="/watchlist" onClick={closeMenu} className={'watchlist-navlink'}>My Watchlist</NavLink></li>
             <li><NavLink to="/companies/my-company" onClick={closeMenu} className={'watchlist-navlink'}>View My Company</NavLink></li>
            <hr className='menu-hr' />
            <li>
              <button onClick={logout} className='logout'>Log Out</button>
            </li>
          </div>

          </>
        ) : (
          <>
          <div className="user-login-signup">
            <OpenModalMenuItem
              itemText="Log In"
              className={'user-login-button'}
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up" 
              className={'user-signup-button'}
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
          </>
        )}
      </ul>
    </div>
    </>
  );
}

export default ProfileButton;