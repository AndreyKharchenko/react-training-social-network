import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";






const Navbar = (props) => {
	return(
		<nav className={s.nav}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
        </div>

        <div className={`${s.item} ${s.active}`}>
          <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
        </div>

        <div className={s.item}>
          <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
        </div>

        <div className={s.item}>
          <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
        </div>

        <div className={s.item}>
          <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
        </div>

        <div className={s.item}>
          <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
        </div>




        <h3>My Friends</h3>

        <div className={s.friends}>
          <img src='https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg'/>
          <NavLink to="/dialogs/1">Dimych</NavLink>
        </div>

        <div className={s.friends}>
          <img src='https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg'/>
          <NavLink to="/dialogs/2">Andrew</NavLink>
        </div>

        <div className={s.friends}>
          <img src='https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg'/>
          <NavLink to="/dialogs/3">Sveta</NavLink>
        </div>
        

    </nav>
		);
}

export default Navbar;