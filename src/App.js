import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
//import ProfileContainer from './components/Profile/ProfileContainer'; // раньше импортировали profile просто
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"; 
import UsersContainer from './components/Usersss/UsersssContainer';
import LoginPage from './components/Login/Login';
import {connect} from "react-redux";
import {intializeApp} from "./redux/app-reducer";
import {withRouter} from "react-router-dom";
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import { withSuspense } from './hoc/withSuspense';


// Использование React lazy
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
       catchAllUnhandledErrors = (reason, promise) => {
              alert("Some error occured");
              //console.error(promiseRejectionEvent);
       }
       componentDidMount() {
              this.props.intializeApp();
              window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
       }
       componentWillUnmount() {
              window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
       }
       render() {
              if(!this.props.initialized) {
                     return <Preloader />
              }

              return (
                     <div className='app-wrapper'>
                            <HeaderContainer />
                            <Navbar />

                            <div className='app-wrapper-content'>
                                   <Switch>
                                                        {/*<Route path='/dialogs' component={Dialogs} />
                                                        <Route path='/profile' component={Profile} />
                                          <Route path='/news' component={News} />
                                          <Route path='/music' component={Music} />
                                          <Route path='/settings' component={Settings} />*/}

                                          <Route exact path='/' 
                                                 render={ () => <Redirect to={'/profile'} /> } />

                                          <Route path='/dialogs' 
                                                 render={ withSuspense(DialogsContainer) } />

                                          <Route path='/profile/:userId?' 
                                                 render={ withSuspense(ProfileContainer) } />

                                          <Route path='/users' 
                                                 render={() => <UsersContainer />} />

                                          <Route path='/login' 
                                                 render={() => <LoginPage />} />
                                   
                                          <Route path='/news' render={ () => <News /> } />
                                          <Route path='/music' render={ () => <Music /> } />
                                          <Route path='/settings' render={ () => <Settings /> } />

                                          <Route path='*' render={ () => <div>404 NOT FOUND</div> } />
                                   </Switch>
                            </div>
                     </div>
              
              );
       }
}


const mapStateToProps = (state) => ({
       initialized: state.app.initialized
})
 // контейнерная компонента
let AppContainer = compose (     
withRouter,
connect(mapStateToProps, {intializeApp}))(App);

// компонента оборачиваем App, BrowserRouter и Provider
const SamuraiJSApp = (props) => {
       return <BrowserRouter>
		<Provider store={store}>
		    <AppContainer />
		</Provider>
  	</BrowserRouter>
} 

export default SamuraiJSApp;




