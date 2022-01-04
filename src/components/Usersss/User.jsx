import React from 'react';
import styles from './usersss.module.css';
import userPhoto from '../../assets/images/user.jpg';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
import Paginator from '../common/Paginator/Paginator';




let User = ({user, followingInProgress, follow, unfollow}) => {
    
    return (
    
    <div className={styles.users}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={ user.photos.small != null ? user.photos.small :  userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div className={styles.FollowButton}>
                    { user.followed 
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { 
                        
                        unfollow(user.id);

                    } }>Unfollow</button> 

                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { 
                        
                        follow(user.id);

                    } }>Follow</button> }
                    
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User;

