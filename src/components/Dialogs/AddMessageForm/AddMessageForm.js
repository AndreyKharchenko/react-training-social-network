import React from 'react';
import s from './../Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
	return(
		<form onSubmit={props.handleSubmit}>
			<div className={s.area}>
				<Field component={Textarea} 
				validate={[required, maxLength50]}
				name="newMessageBody" placeholder="Enter your message text"/>					 
			</div>
			<div className={s.sendButton}>
				
				<button>Send</button>
			</div>
		</form>
	);
}

export const AddMessageFormRedux = reduxForm({
	form: "dialogAddMessageForm"
})(AddMessageForm)

//AddMessageFormRedux дочерняя компонента
//Dialogs родительская компонента 
//в параметры addNewMessage приходят данные из формы