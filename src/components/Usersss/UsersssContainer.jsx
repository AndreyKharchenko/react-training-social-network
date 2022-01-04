import React from 'react';
import { connect } from 'react-redux';
import { 
    follow, 
    unfollow, 
    setCurrentPage, 
    toggleFollowingProgress,
    //thunk
    requestUsers} from '../../redux/users-reducer';
import * as axios from 'axios';
import Users from './Usersss';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount,getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';





// 1 контейнерная компонента которая делает ajax запросы
class UsersContainer extends React.Component {  

    

    componentDidMount() { // данный метод показывает, что наша компонента вмонтирована=отрисована=вставлена
        
        //this.props.getUsers(this.props.currentPage, this.props.pageSize);
        const {currentPage, pageSize} = this.props; // деструктуризация
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        
        //this.props.getUsers(pageNumber, this.props.pageSize);
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        
        return  <>
        { this.props.isFetching ? <Preloader /> : null }
        <Users totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         onPageChanged={this.onPageChanged}
                         users={this.props.users}
                         follow={this.props.follow}
                         unfollow={this.props.unfollow}
                         //toggleFollowingProgress={this.props.toggleFollowingProgress}
                         followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}



let mapStateToProps = (state) => {
    
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state) // массив
    }
}


// коллбэки, которые диспатчат информацию в state
/* старый вариант mdtp
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },

        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },

        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },

        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },

        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount));
        },

        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }

    }
}*/



export default compose(
    //withAuthRedirect,
    connect(mapStateToProps, {
    follow, //thunk
    unfollow, //thunk
    setCurrentPage,
    toggleFollowingProgress, // колбэк
    getUsers: requestUsers})
)(UsersContainer);