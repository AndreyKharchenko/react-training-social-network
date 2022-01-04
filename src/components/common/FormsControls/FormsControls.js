import React from "react";
import styles from "./FormsControls.module.css";
import { Field } from "redux-form";


const FormControl = ({input, meta: {touched, error}, children}) => { // рест оператор в параметрах
    //const hasError = meta.touched && meta.error; // если мы были в textarea и есть какая-то ошибка, то true
    const hasError = touched && error; // если мы были в textarea и есть какая-то ошибка, то true
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {/*props.children*/}
                {children}
            </div>
            { hasError && <span>{error}</span> }
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props; // деструктаризация
    return <FormControl {...props}><textarea className={styles.texareaItem} {...input} {...restProps} /></FormControl> // textarea это child
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input className={styles.inputItem} {...input} {...restProps} /></FormControl> // input это child
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
        {text} <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> 
    </div>
)
