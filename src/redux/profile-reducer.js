import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11},
      {id: 3, message: 'Blabla', likesCount: 11},
      {id: 4, message: 'Dada', likesCount: 11}
    ],
    //newPostText: 'it-kams',
    profile: null,
    status: ""
};

const profileRuducer = (state = initialState, action) => {

	

    switch (action.type) {
    	case ADD_POST: {
    		let newPost = {
            id: 5,
            message: action.newPostText,
            likesCount: 0
        	};
            // Делаем сначала копию а потом меняем всё что нужно
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
            // до копирований было
        	//state.posts.push(newPost);
        	//state.newPostText = '';
    		//return state;
        }
    	
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile // определим это свойство в state
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
                
            }
        }

        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
    	default:
    		return state;
    		
    }

}


// action creator(ы)
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type: SET_STATUS, status})

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})



export const deletePost = (postId) => ({type: DELETE_POST, postId}) 

// thunk creator
export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId);
	dispatch(setUserProfile(response.data)); 
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);    
	dispatch(setStatus(response.data));
    
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch(error) {
        // Код при ошибке
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        // Парсим строку
        const str = response.data.messages[0];

        let start_contacts = str.indexOf("Contacts");
        let end_contacts = str.indexOf("->");
        let contacts = (str.slice(start_contacts, end_contacts)).toLowerCase();

        let start_network = str.indexOf("->") + 2;
        let end_network = str.lastIndexOf(")");
        let network = (str.slice(start_network, end_network)).toLowerCase();

        console.log(contacts);
        console.log(network);

        dispatch(stopSubmit("edit-profile", {contacts: {[network]:response.data.messages[0]} }));

        //dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));

        return Promise.reject(response.data.messages[0]); // если ошибка, то промис reject
    }
}

export default profileRuducer;