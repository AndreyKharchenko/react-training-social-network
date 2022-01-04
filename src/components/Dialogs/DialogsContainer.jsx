import React from 'react';
//import s from './Dialogs.module.css';
//import {NavLink} from "react-router-dom";
//import DialogItem from './DialogItem/DialogItem';
//import Message from './Message/Message';
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "./../../hoc/withAuthRedirect";
import { compose } from 'redux';


let mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		
		sendMessage: (newMessageBody) => {
			dispatch(sendMessageCreator(newMessageBody));
		}

	}
}

/*compose(
	connect(mapStateToProps,mapDispatchToProps),
	withAuthRedirect
)(Dialogs)

let AuthRedirectComponent = withAuthRedirect(Dialogs); // withAuthRedirect - это HOC(возвращает классновыую контейнерную компоненту)

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;*/

export default compose(
	connect(mapStateToProps,mapDispatchToProps),
	withAuthRedirect
)(Dialogs);

