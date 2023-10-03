import React from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import {CREATE_USER, CREATE_USER_CANCEL, IUser} from "../state/schedulerTypes";
import {createUser} from "../state/schedulerActions";

function CreateUser() {
    const dispatch = useDispatch();
    const {firstName, lastName, username, password, role}: IUser = useSelector((state:AppState) => state.schedulerState.newUser);
    const isCreateUserInProgress: boolean = useSelector((state:AppState) => state.schedulerState.isCreateUserInProgress);
    const successfulRegisterMessage:string = useSelector((state: AppState) => state.schedulerState.successfulRegisterMessage);
    const errorRegisterMessage: string = useSelector((state: AppState) => state.schedulerState.errorRegisterMessage)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const changeValue = {
            [name]: value
        };

        dispatch({type: CREATE_USER, payload: {newUser: {firstName, lastName, username, password, role, ...changeValue}}})
    }
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(createUser({firstName, lastName, username, password, role}))
    }
    const handleCancel = () => {
        dispatch({type: CREATE_USER_CANCEL})
    }

    return (
        <>
            <Header />
            <main>
                {successfulRegisterMessage ? (
                    <div className="card">
                        <div className="row">
                            <div className="card error">{successfulRegisterMessage}</div>
                        </div>
                    </div> ) : null}
                {errorRegisterMessage ? (
                    <div className="card">
                        <div className="row">
                            <div className="card error">{errorRegisterMessage}</div>
                        </div>
                    </div> ) : null}
                <form className="input-group vertical" onSubmit={handleSubmit}>
                    <label htmlFor="name">First Name</label>
                    <input type="text" name="firstName" required={true} value={firstName} placeholder="First Name" onChange={handleChange} />
                    <label htmlFor="name">Last Name</label>
                    <input type="text" name="lastName" required={true} value={lastName} placeholder="Last Name" onChange={handleChange} />
                    <label htmlFor="name">Username</label>
                    <input type="text" name="username" required={true} value={username} placeholder="username" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required={true} value={password} placeholder="password" onChange={handleChange} />
                    <label htmlFor="password">Role</label>
                    <div className="input-group">
                        <input type="radio" name="role" onChange={handleChange} value={"admin"} id={"roleadmin"} checked={role==='admin' ? true : false} /> <label htmlFor={"roleadmin"}>Admin</label>
                        <input type="radio" name="role" onChange={handleChange} value={"user"} id={"roleuser"} checked={role==='user' ? true : false} />  <label htmlFor={"roleuser"}>User</label>
                    </div>
                    <div className="input-group">
                        <button className="primary bordered medium" type={"submit"} disabled={isCreateUserInProgress}>Submit</button>
                        <button type="button" className="bordered medium" disabled={isCreateUserInProgress} onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default CreateUser;
