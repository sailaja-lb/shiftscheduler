import {ICredentials, IInitialState, LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS} from "./schedulerTypes";
import { ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
//import {AppState} from "../state";
import {usersAPI} from "../restAPI";

export function loginUser(credentials: ICredentials): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        dispatch({type: LOGIN_START});
        return usersAPI.find(credentials.username, credentials.password)
            .then(user => dispatch({type: LOGIN_SUCCESS, payload: user}))
            .catch(error => dispatch({type: LOGIN_ERROR, payload: {message: error.message}}))
        // return fetch(`http://localhost:4000/users/username/${credentials.username}`, {method: 'GET'})
        //     .then(() => dispatch({type: LOGIN_SUCCESS}));
        // return Promise.resolve();
    }
}
