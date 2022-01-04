import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';



let initialState = {
   initialized: false
};

const appRuducer = (state = initialState, action) => {
    switch (action.type) {
    	case INITIALIZED_SUCCESS: 
            return {
            ...state, 
            initialized: true
            
        };
        
    	default:
    		return state;
    		
    }

}




export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}); // объект action





//Thunk creator(ы)

export const intializeApp = () => (dispatch) => {
    // в propmise придут данные об асинхронной операции, которая вызывывется диспатчем
    let promise = dispatch(getAuthUserData()); // получаем авторизационные данные
    
    // Promise.all() используем, если бы были еще мно-о диспатчей, возвращающих промисы и нужно дождаться выполонения их всех
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess()); // когда первый диспатчим закончится(все операции в TC сделаются, сюда придут данные(выполниться эта функция))
    });
    
}




export default appRuducer;