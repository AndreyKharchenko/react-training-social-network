import {usersAPI} from "../api/api"; // взаимодействие с DAL
import { updateObjectInArray } from "../utils/object-helpers";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; // крутилка
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1, // отображвет текущую страницу
    isFetching: true, // preloader
    followingInProgress: [], // массив заблокированных кнопок 
    fake: 10
};

const usersRuducer = (state = initialState, action) => {

	

    switch (action.type) {
        
    	case FOLLOW: 
            return {
            ...state, 
            users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            //users: [...state.users], 
            /*users: state.users.map(u => {
                if(u.id === action.userId) {
                    return {
                        ...u,
                        followed: true // меняем свойство у объекта из массива users
                    }
                }
                return u; // один объект из массива users
            })*/
        }
        case UNFOLLOW:
            return {
                ...state, 
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                //users: [...state.users], 
                /*users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {
                            ...u,
                            followed: false // меняем свойство у объекта из массива users
                        }
                    }
                    return u; // один объект из массива users
                })*/
            }
        
        case SET_USERS: {
            return {
                ...state,
                users: action.users 
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
            
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }
    	default:
    		return state;
    		
    }

}



// AC после переименования
export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId}) // т.к userId это переменная, то свойство не создаем
export const setUsers = (users) => ({type: SET_USERS, users}) // установить всех userов
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage }) // изменение текущей станицы при клике
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) // установить общее кол-во пользователей
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

// Thunk 
export const requestUsers = (page, pageSize) => {

    return async (dispatch) => {
    
        dispatch(toggleIsFetching(true)); // ждем данные с сервера, preloader крутится
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize); // response(data) - ответ с сервера
        dispatch(toggleIsFetching(false)); //данные пришли - картинки нет
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
} 

const followUnfolllowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId); // response - ответ с сервера

    if(response.data.resultCode == 0){
        dispatch(actionCreator(userId)); // когда на сервере подтверждена подписка
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    
    return async (dispatch) => {
        followUnfolllowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);

        /*dispatch(toggleFollowingProgress(true, userId));
        let response = await apiMethod(userId); // response - ответ с сервера

        if(response.data.resultCode == 0){
            dispatch(actionCreator(userId)); // когда на сервере подтверждена подписка
        }
        dispatch(toggleFollowingProgress(false, userId));    */ 
        
    }
}

export const unfollow = (userId) => {
    
    return async (dispatch) => {
        followUnfolllowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);

        /*dispatch(toggleFollowingProgress(true, userId));
        let response = await apiMethod(userId); // response - ответ с сервера

        if(response.data.resultCode == 0){
            dispatch(actionCreator(userId)); // когда на сервере подтверждена подписка
        }
        dispatch(toggleFollowingProgress(false, userId));   */  
        
    }
}

export default usersRuducer;