import {
    ActionTypes, ADMIN_VIEW_SHIFTS, CREATE_SHIFT,
    CREATE_USER,
    CREATE_USER_CANCEL, CREATE_USER_ERROR,
    CREATE_USER_SUBMIT,
    CREATE_USER_SUCCESS,
    IInitialState, IShift,
    IUser,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    UPDATE_CREDENTIALS,
    USERS
} from './schedulerTypes';


export const newUserModel: IUser = { firstName: "", lastName: "", username: "", password: "", role:  "user"};
export const newShiftModel: IShift = { title: "", date: "" };
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
    newUser: {...newUserModel},
    loginDisabled: false,
    isCreateUserInProgress: false,
    errorRegisterMessage: "",
    isCreateShift: false,
    isAdminViewShifts: false,
    newShift: {...newShiftModel}
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
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                successfulRegisterMessage: "User has been registered successfully",
                newUser: {...newUserModel},
                errorRegisterMessage: "",
                isCreateUserInProgress: false
            };
        case CREATE_USER:
            return {
                ...state,
                newUser: action.payload.newUser,
                successfulRegisterMessage: "",
                errorRegisterMessage: ""
            };
        case CREATE_USER_SUBMIT:
            return {
                ...state,
                isCreateUserInProgress: true
            };
        case CREATE_USER_ERROR:
            return {
                ...state,
                isCreateUserInProgress: false,
                errorRegisterMessage: action.payload.message,
            };
        case CREATE_USER_CANCEL:
            return {
                ...state,
                newUser: {...newUserModel},
                successfulRegisterMessage: "",
                errorRegisterMessage: ""
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
        case CREATE_SHIFT:
            return {
                ...state,
                isCreateShift: true,
                isAdminViewShifts: false,
                users: []
            };
        case ADMIN_VIEW_SHIFTS:
            return {
                ...state,
                isCreateShift: false,
                isAdminViewShifts: true
            };
        default:
            return state;

    }
}