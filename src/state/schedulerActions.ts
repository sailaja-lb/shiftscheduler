import {
    CREATE_USER_ERROR, CREATE_USER_SUBMIT, CREATE_USER_SUCCESS,
    ICredentials,
    IInitialState,
    IUser,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS
} from "./schedulerTypes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
//import {AppState} from "../state";
import {usersAPI} from "../restAPI";

export function loginUser(credentials: ICredentials): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        dispatch({type: LOGIN_START});
        return usersAPI.find(credentials.username, credentials.password)
            .then(user => dispatch({type: LOGIN_SUCCESS, payload: user}))
            .catch(error => dispatch({type: LOGIN_ERROR, payload: {message: error.message}}))
    }
}

export function createUser(user: IUser): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        dispatch({type: CREATE_USER_SUBMIT});
        return usersAPI.post(user)
            .then(user => dispatch({type: CREATE_USER_SUCCESS}))
            .catch(error => dispatch({type: CREATE_USER_ERROR, payload: {message: error.message}}))
    }
}

export function createShift(user: IUser): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        dispatch({type: CREATE_USER_SUBMIT});
        return usersAPI.post(user)
            .then(user => dispatch({type: CREATE_USER_SUCCESS}))
            .catch(error => dispatch({type: CREATE_USER_ERROR, payload: {message: error.message}}))
    }
}
