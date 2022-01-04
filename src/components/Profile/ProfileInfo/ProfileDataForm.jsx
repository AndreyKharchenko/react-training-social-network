import React from "react";
import s from './ProfileInfo.module.css';
import style from "../../common/FormsControls/FormsControls.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div><button className={s.editProfileButton}>Save</button></div>
            { error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div className={s.descriptionWrapper}><strong>Description</strong>
                <div className={s.descriptionData}>
                    <div>
                        <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
                    </div>
        
                    <div>
                        <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
                    </div>
        
                    <div>
                        <b>My professional skills:</b> {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
                    </div>
        
                    <div>
                        <b>About me:</b> {createField("About me", "aboutMe", [], Textarea)}
                    </div>
                </div>
    
            </div>
            <div> <strong>My contacts</strong>
                {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contacts}> 
                        <b>{key}:</b> {createField(key, "contacts." + key, [], Input)}
                    </div>
                })}
            </div>
  
      </form>
    );
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;