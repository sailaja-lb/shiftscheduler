import {
    ActionTypes,
    CREATE_USER,
    CREATE_USER_CANCEL,
    IInitialState,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER,
    REGISTER_CANCEL,
    UPDATE_CREDENTIALS,
    USERS
} from './schedulerTypes';
//import {usersAPI} from "../restAPI";

export const initialState: IInitialState = {
    users: [],
    isLoggedIn: false,
    isRegister: false,
    loggedInUser: null,
    successfulRegisterMessage: "",
    loginErrorMessage: "",
    page: 1,
    loginPending: false,
    registerPending: false,
    credentials: {username:'', password:''},
    newUser: null,
    loginDisabled: false
};

export function schedulerReducer(
    state:IInitialState = initialState,
    action: ActionTypes
)
{
    switch (action?.type) {
        case UPDATE_CREDENTIALS:
            return {
                ...state,
                credentials: action.payload.credentials
            };
        case LOGIN_START:
            return {
                ...state,
                loginDisabled: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginDisabled: false,
                isLoggedIn: true,
                loginErrorMessage: "",
                loggedInUser: action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginDisabled: false,
                isLoggedIn: false,
                loginErrorMessage: action.payload.message
            };
        case REGISTER:
            return { ...state,
                isRegister: true,
                loginErrorMessage: "",
                successfulRegisterMessage: false };
        case REGISTER_CANCEL:
            return { ...state,
                isRegister: false,
            };
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users],
                isRegister: false,
                isLoggedIn: false,
                successfulRegisterMessage: true
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        case USERS:
            return {
                ...state,
                users: [...state.users],
            };
        case CREATE_USER_CANCEL:
            return {
                ...state,
                isRegister: false,
                isLoggedIn: false,
            };
        default:
            return state;

    }
}