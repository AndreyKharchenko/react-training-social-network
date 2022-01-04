import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'kao-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'kao-network/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
   userId: null,
   email: null,
   login: null,
   isAuth: false,
   captchaUrl: null // if null, then captcha is not required
   
};

const authRuducer = (state = initialState, action) => {
    switch (action.type) {
    	case SET_USER_DATA: 
        case GET_CAPTCHA_URL_SUCCESS:
            return {
            ...state, 
            ...action.payload, // свойства которые сидят в data(payload) перезатрут свойства из state
            //isAuth: true // убираем так как мы его перадаем в action
        };
        
    	default:
    		return state;
    		
    }

}



// убрали окончание AC и переименовали setUsersTotalCountAC в setTotalUsersCount
export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: 
    {userId, email, login, isAuth} }); // объект action

export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} });





//Thunk creator(ы)
// 1. вариант через then
/*export const getAuthUserData = () => (dispatch) => {
        return authAPI.me().then(response => { // response(data) - это то, что получили мы с сервера
            if(response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true)); // данные о нас придут в reducer
    
                /* Получаем полное имя - сделал для тренировки, а так не нужно
                axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+response.data.data.id)
                .then(response => {
                    this.props.setFullName(response.data.fullName);
                })*/
            /*}          
        });
}*/
// 2. вариант через async await
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me(); // response сюда придут данные зарезолвенного промиса
    if(response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true)); 
    }              
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
        
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if(response.data.resultCode === 0) { // если залогинились, то снова запросить информацию обо мне(авторизовавшемся пользователе)
        // success, get auth data
        dispatch(getAuthUserData());
    }
    else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        let action = stopSubmit("login", {_error: message});
        dispatch(action);
    }     
}

export const getCaptchaUrl = () => async (dispatch) => {
        
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url; // получили url
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if(response.data.resultCode === 0) { // если вылогинились, то снова запросить информацию обо мне
        dispatch(setAuthUserData(null, null, null, false)); // данные о нас придут в reducer(занулили данные о нас)
    }
}


export default authRuducer;