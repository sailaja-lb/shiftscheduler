import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ICredentials, UPDATE_CREDENTIALS} from "../state/schedulerTypes";
import {AppState} from "../state";
import {loginUser} from "../state/schedulerActions";

function Login() {

    const dispatch = useDispatch();
    const { username, password }: ICredentials = useSelector((state: AppState)  => state.schedulerState.credentials);
    const loginDisabled: boolean = useSelector((state: AppState) => state.schedulerState.loginDisabled);
    const loginErrorMessage: string = useSelector((state: AppState) => state.schedulerState.loginErrorMessage);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const changeValue = {
            [name]: value
        };
        dispatch({type: UPDATE_CREDENTIALS, payload: {credentials: {username, password, ...changeValue}}});
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(loginUser({ username, password }))
    }

    return (
        <>
            {loginErrorMessage ? (
                <div className="card">
                    <div className="row">
                        <div className="card error">{loginErrorMessage}</div>
                    </div>
                </div> ) : null}
            <form className="input-group vertical" onSubmit={handleSubmit} name={"schedulerLogin"}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="username" value={username} required={true} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input name="password" id="password" placeholder="password" type={"password"} value={password} required={true} onChange={handleChange} />
                <div className="input-group">
                    <button className="primary bordered medium" type={"submit"} disabled={loginDisabled}>Login</button>
                </div>
            </form>
        </>
    );
}

export default Login;
