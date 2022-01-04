import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
//import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.jpg';
import ProfileDataFormReduxForm from './ProfileDataForm';


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false); 
  if(!profile) {
    return <Preloader /> // если  profile нет
  }


  const onMainPhotoSelected = (e) => {
      if(e.target.files.length) {
        savePhoto(e.target.files[0]);
      }
     
  }

  const onSubmit = (formData) => { // сюда придут данные из формочки
    saveProfile(formData).then(() => {

        setEditMode(false);
    });
    
  }
  
	return(
		<div className={s.info}>
        
        

        <div className={s.descriptionBlock}>
          <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
          <div>{isOwner && <label>Change profile photo
          <input type={"file"} onChange={onMainPhotoSelected} /></label>}</div>

          <strong><div>Status</div></strong>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

          {editMode 
              ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
              : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true);}} />}

        </div>
       
    </div>
		);
}


const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return(
    <div>
      {isOwner && <div><button className={s.editProfileButton} onClick={goToEditMode}>Edit</button></div>}
      <div className={s.descriptionWrapper}><strong>Description</strong>
          <div className={s.descriptionData}>
            <div>
              <b>Full name:</b> {profile.fullName}
            </div>

            <div>
              <b>Looking for a job:</b> {profile.lookingForAJob ? "YES :-)" : "NO"}
            </div>

            {profile.lookingForAJob && <div><b>My professional skills:</b> {profile.lookingForAJobDescription} </div>}

            <div>
              <b>About me:</b> {profile.aboutMe}
            </div>
          </div>

      </div>
      <div> <strong>My contacts</strong>
          {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
          })}
      </div>

    </div>
  );
}


const Contact = ({contactTitle, contactValue}) => {
  return <div className={s.contact}><b>{contactTitle}:</b>{contactValue ? contactValue : " No "}</div>
}

export default ProfileInfo;