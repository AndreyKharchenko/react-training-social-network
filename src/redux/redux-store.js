import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersRuducer from "./users-reducer";
import authRuducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appRuducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage:dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersRuducer,
    auth: authRuducer,
    form: formReducer,
    app: appRuducer

});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store; 

export default store;