import React, {PureComponent} from 'react';
import { Field, reduxForm } from 'redux-form';
import { required,maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';



const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field name="newPostText" component={Textarea} placeholder={"Post message"}
          validate={[required, maxLength10]}/>
        </div>

        <div className={s.submitButton}>
          <button>Add Post</button>
        </div>
    </form>
  );
}

let AddNewPostFormRedux = reduxForm({
  form: "ProfileAddNewPostForm"
})(AddNewPostForm);

/*class MyPosts extends React.PureComponent {
  //shouldComponentUpdate(nextProps, nextState) {
    //return nextProps != this.props || nextState != this.state;
  //}
  render() {
         console.log("RENDER YO");

        let postsElements = 
          this.props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

        let newPostElement = React.createRef();

        let onAddPost = (values) => {
          this.props.addPost(values.newPostText); // данные из textarea пришли сюда
          //props.addPost();
          //props.dispatch(addPostActionCreator()); // всегда "диспатчим" action
        }
        return(
          <div className={s.postsBlock}>
                <h3>My posts</h3>
                
                <AddNewPostFormRedux onSubmit={onAddPost} />
                <div className={s.posts}>
                  { postsElements } 
                  
                </div>
          </div>
          );
    }
}
*/

const MyPosts = React.memo((props) => {
  console.log("RENDER");  

    let postsElements = 
      props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let onAddPost = (values) => {
      props.addPost(values.newPostText); // данные из textarea пришли сюда
      
    }
    return(
      <div className={s.postsBlock}>
            <h3>My posts</h3>
            
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
              { postsElements } 
              
            </div>
      </div>
      );
})



export default MyPosts;