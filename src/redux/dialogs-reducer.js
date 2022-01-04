const SEND_MESSAGE = 'SEND_MESSAGE'; 


let initialState = {
	messages: [
	  {id: 1, message: 'Hi'}, 
	  {id: 2, message: 'How is your it-study?'},
	  {id: 3, message: 'Yo'}, 
	  {id: 4, message: 'Yo'},
	  {id: 5, message: 'Yo'}
	],
	

	dialogs: [
	  {id: 1, name: 'Dimych'}, 
	  {id: 2, name: 'Andrew'},
	  {id: 3, name: 'Sveta'}, 
	  {id: 4, name: 'Sasha'},
	  {id: 5, name: 'Viktor'}, 
	  {id: 6, name: 'Valera'}
	],
	
};


const dialogsReducer = (state = initialState,action) => {

	switch (action.type) {  
		case SEND_MESSAGE: 
			//let body = state.newMessageBody;
        	//state.newMessageBody = '';
        	//state.messages.push({id: 6, message: body});
        	//return state;
			// Делаем сначала копию а потом меняем всё что нужно
			//let body = state.newMessageBody;

			let body = action.newMessageBody;
			return {
				...state,
				//newMessageBody: '',
				messages: [...state.messages, {id: 6, message: body}] // тут создаем копию, так как будем менять messages
			};
			
			//stateCopy.messages.push({id: 6, message: body}); теперь пушим по новому
		default:
			return state;
	}
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})



export default dialogsReducer;