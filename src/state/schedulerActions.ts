import {
    ICredentials,
    IInitialState,
    IShift,
    IUser,
    VIEW_SHIFTS,
    VIEW_SHIFTS_ERROR,
    CREATE_SHIFT,
    CREATE_SHIFT_ERROR,
    CREATE_SHIFT_SUCCESS,
    CREATE_USER_ERROR,
    CREATE_USER_SUBMIT,
    CREATE_USER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    USERS,
    VIEW_TIMEOFFS,
    VIEW_TIMEOFFS_ERROR,
    ITimeoff,
    REQUEST_TIMEOFF_SUCCESS, TIMEOFF_UPDATE_STATUS, ACCEPT_AVAILABLE_SHIFT, REQUEST_SHIFT_TAKEOVER
} from "./schedulerTypes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {shiftsAPI, timeoffAPI, usersAPI} from "../restAPI";

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

export function createShift(): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        dispatch({type: CREATE_SHIFT});
        return usersAPI.getAll()
            .then(users => dispatch({type: USERS, payload: { users }}))
            .catch(error => dispatch({type: USERS, payload: { users: [] }}))
    }
}

export function submitShift(shift: IShift): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        dispatch({type: CREATE_USER_SUBMIT});
        return shiftsAPI.post(shift)
            .then(shift => dispatch({type: CREATE_SHIFT_SUCCESS, payload: { submittedShift: shift }}))
            .catch(error => dispatch({type: CREATE_SHIFT_ERROR, payload: { message: error.message }}))
    }
}
export function viewAdminShifts(): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return shiftsAPI.getAll()
            .then(shifts => dispatch({type: VIEW_SHIFTS, payload: { shifts }}))
            .catch(error => dispatch({type: VIEW_SHIFTS_ERROR, payload: { message: error.message }}))
    }
}
export function viewUserShifts(userId: number): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return shiftsAPI.getUserShifts(userId)
            .then(shifts => dispatch({type: VIEW_SHIFTS, payload: { shifts }}))
            .catch(error => dispatch({type: VIEW_SHIFTS_ERROR, payload: { message: error.message }}))
    }
}

export function viewAllTimeoffs(): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return timeoffAPI.getAll()
            .then(timeoffs => dispatch({type: VIEW_TIMEOFFS, payload: { timeoffs }}))
            .catch(error => dispatch({type: VIEW_TIMEOFFS_ERROR, payload: { message: error.message }}))
    }
}

export function viewUserTimeoffs(userId: number): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return timeoffAPI.getUserTimeoffs(userId)
            .then(timeoffs => dispatch({type: VIEW_TIMEOFFS, payload: { timeoffs }}))
            .catch(error => dispatch({type: VIEW_TIMEOFFS_ERROR, payload: { message: error.message }}))
    }
}

export function viewAllUsers(): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return usersAPI.getAll()
            .then(users => dispatch({type: USERS, payload: { users }}))
    }
}
//
export function submitRequestTimeoff(timeoff: ITimeoff): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return timeoffAPI.post(timeoff)
            .then(newTimeoff => dispatch({type: REQUEST_TIMEOFF_SUCCESS, payload: { timeoff: newTimeoff }}));
    }
}
export function updateRequestTimeoff(timeoff: ITimeoff): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return timeoffAPI.put(timeoff)
            .then(newTimeoff => dispatch({type: TIMEOFF_UPDATE_STATUS, payload: { timeoff: newTimeoff }}));
    }
}
export function updateShift(shift: IShift): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return shiftsAPI.put(shift)
            .then(updatedShift => dispatch({type: ACCEPT_AVAILABLE_SHIFT, payload: { updatedShift }}));
    }
}
export function updateRequestShift(shift: IShift): any {
    return function (dispatch:ThunkDispatch<IInitialState, null, Action<string>>) {
        return shiftsAPI.put(shift)
            .then(updatedShift => dispatch({type: REQUEST_SHIFT_TAKEOVER, payload: { updatedShift }}));
    }
}


