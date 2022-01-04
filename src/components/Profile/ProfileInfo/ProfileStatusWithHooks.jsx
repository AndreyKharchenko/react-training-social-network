import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';

// Отображате статус пришедший из props
const ProfileStatusWithHooks = (props) => {

    /*let stateWithSetState = useState(true);
    let editMode = stateWithSetState[0]; // равен false
    let setEditMode = stateWithSetState[1];*/

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={ activateEditMode }>{props.status || "----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } value={status} />
                </div>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;