import React from 'react';
import Header from "./Header";
import * as axios from 'axios';
import { connect } from 'react-redux';
import { logout /* thunk creator */} from '../../redux/auth-reducer';



class HeaderContainer extends React.Component  {


  render() {
      return(
        <Header {...this.props} />
      );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }
}

export default connect(mapStateToProps, {
  logout
})(HeaderContainer);