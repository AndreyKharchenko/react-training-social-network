import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login, logout } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "../common/FormsControls/FormsControls.module.css";

//const maxLength20 = maxLengthCreator(20); // возвращает функцию, аналог ThunkCreator
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    
    return (   
        <form onSubmit={handleSubmit}>
            {/* 
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input} type={"text"} validate={[required]}/>
            </div>
            
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} type={"password"} validate={[required]}/>  
            </div>

            <div>
                remember me <Field component={Input} name={"rememberMe"} type={"checkbox"} /> 
            </div>
            */}
            
            {createField("Email", "email", [required], Input, {type: "text"})}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl} className={style.captchaImg} /> }
            { captchaUrl &&  createField("Symbols from image", "captcha", [required], Input, {type: "text"}) }

            { error && <div className={style.formSummaryError}>
                {/*props.error*/}
                {error}
            </div>
            }
            <div className={style.loginButton}>
                <button>Login</button>
            </div>
            
            
        </form>
    );
    
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => { // сюда придут данные из формочки
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div className={style.loginWrapper}>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login, logout})(Login); // диспатчим ThunkCreators