import React from 'react';
import axios from 'axios';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// 1 контейнерная компонента - делает запрос на сервер
class ProfileContainer extends React.Component {
	
	// Функция с общей логикой для методов ЖЦ
	refreshProfile() {
		let userId = this.props.match.params.userId;
		if(!userId) { // если userId придет undefained
			userId = this.props.authorizedUserId; // была 2
			if(!userId) {
				this.props.history.push("/login");
			}
		}
		this.props.getUserProfile(userId);
		this.props.getStatus(userId); // запрос за статусом(thunk)
	}
	componentDidMount() {
		this.refreshProfile();
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			this.refreshProfile();
		}
		
	}
	render() {
		
		return(
			<Profile {...this.props} 
					isOwner={!this.props.match.params.userId}
					profile={this.props.profile} 
					status={this.props.status} 
					updateStatus={this.props.updateStatus} 
					savePhoto={this.props.savePhoto} 
					saveProfile={this.props.saveProfile} />
		);
    }
}


let mapStateToProps = (state) => {
	
	return ({
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth
	})
}

// Compose - это контейнер, в котором ProfileContainer начальная компонента, а все уровни снизу в вверх - это все этапы обёрток

export default compose(
	connect(mapStateToProps, {
		getUserProfile, // это thunk creator
		getStatus,
		updateStatus,
		savePhoto,
		saveProfile
	}), // 3 уровень
	withRouter, // 2 уровень 
	//withAuthRedirect // 1 уровень обертки
)(ProfileContainer);

/*let AuthRedirectComponent = withAuthRedirect(ProfileContainer); // withAuthRedirect - это HOC(возвращает классовую контейнерную компоненту)*/

/*let mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});*/

// 2 обертка(контейнерная компонента) - закидывает данные из URL в конечую компоненту
//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent); // возвращает новую компоненту, которая отрисует ProfileContainer с данными из URL


// 3 контейнерная компонента - закинет в глубину/конечую компоненту данные из store
/*export default connect(mapStateToProps, {
	//setUserProfile,
	getUserProfile // это thunk creator
})(WithUrlDataContainerComponent);*/

// Итого - презентационная компонента Profile получит данные сразу от 3 контейнерных компонент(оберток)


