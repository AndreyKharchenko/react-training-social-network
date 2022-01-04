import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

/*Константы*/

let store = {
    _state: {
        profilePage: {
          posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
          ],
          newPostText: 'it-kams'
        },

        dialogsPage: {
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
          newMessageBody: "" /*В видео - newMessageBody*/
        },

        sidebar: {
          friends: [
            {id: 1, name: 'Dimych'}, 
            {id: 2, name: 'Andrew'},
            {id: 3, name: 'Sveta'}
          ]
        }
    },
    _callSubscriber()  {
        console.log('State changed');
    },

    getState() {
      return this._state;
    },
     subscribe(observer) {
      this._callSubscriber = observer; // наблюдатель - паттерн - subscriber - observer
      // подписчик это rerenderEntireTree
    },

    /*addPost()  {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      };

      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this._state);
    },
    updateNewPostText(newText) {
      this._state.profilePage.newPostText = newText;
      this._callSubscriber(this._state);
    },
    addMessage() {
      let newMessage = {
        id: 6,
        message: this._state.dialogsPage.newMessageText
      };

      this._state.dialogsPage.messages.push(newMessage);
      this._state.dialogsPage.newMessageText = '';
      this._callSubscriber(this._state);
    },
    updateNewMessageText(newText) {
      this._state.dialogsPage.newMessageText = newText;
      this._callSubscriber(this._state);
    },*/

    dispatch(action) { // объект который говорит какое действие совершить {type: 'ADD-POST'}
        
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        
        this._callSubscriber(this._state);

        /* Старый способ - до редусеров
        if(action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };

            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if(action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if(action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messages.push({id: 6, message: body});
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        }*/

    }
   
}

export default store;

// store - ООП