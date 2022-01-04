import React from 'react';
import s from './Dialogs.module.css';
import {NavLink, Redirect} from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { AddMessageFormRedux } from './AddMessageForm/AddMessageForm';




const Dialogs = (props) => {

	let state = props.dialogsPage; // !!!!!! у нас весь dialogsPage в props


	let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} id={d.id} /> );
	let messagesElements = state.messages.map(m => <Message message={m.message} />);
	let newMessageBody = state.newMessageBody;


	let addNewMessage = (values) => {
		props.sendMessage(values.newMessageBody);
		
	}

	if (!props.isAuth) return <Redirect to={"/login"} />;

	return(
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{ dialogsElements }
			</div>
			<div className={s.messages}>
				<div>{ messagesElements }</div>
				<AddMessageFormRedux onSubmit={addNewMessage}/>
				
			</div>
			
		</div>

		);

}



//AddMessageFormRedux дочерняя компонента
//Dialogs родительская компонента 
//в параметры addNewMessage приходят данные из формы

export default Dialogs;