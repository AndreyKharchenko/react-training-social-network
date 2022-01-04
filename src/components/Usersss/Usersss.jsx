import React from 'react';
import styles from './usersss.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
    
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} />
        <div>
        {
            users.map(u => <User user={u} 
                                followingInProgress={props.followingInProgress} 
                                follow={props.follow} 
                                unfollow={props.unfollow} key={u.id}/>)
        }
        </div>
    </div>
}

export default Users;

