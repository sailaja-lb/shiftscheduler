import {
    ACCEPT_AVAILABLE_SHIFT,
    ActionTypes,
    CREATE_SHIFT,
    CREATE_SHIFT_CANCEL,
    CREATE_SHIFT_SUBMIT,
    CREATE_SHIFT_SUCCESS,
    CREATE_USER,
    CREATE_USER_CANCEL,
    CREATE_USER_ERROR,
    CREATE_USER_SUBMIT,
    CREATE_USER_SUCCESS,
    IInitialState,
    IShift,
    ITimeoff,
    IUser,
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REQUEST_TIMEOFF,
    REQUEST_TIMEOFF_ERROR,
    REQUEST_TIMEOFF_SUCCESS,
    TIMEOFF_UPDATE_STATUS,
    UPDATE_CREDENTIALS,
    USERS,
    VIEW_SHIFTS,
    VIEW_SHIFTS_ERROR,
    VIEW_TIMEOFFS,
    VIEW_TIMEOFFS_ERROR,
    REQUEST_SHIFT_TAKEOVER
} from './schedulerTypes';

export const newUserModel: IUser = { firstName: "", lastName: "", username: "", password: "", role:  "user"};
export const newShiftModel: IShift = { title: "", date: "", endDate: "" };
export const newTimeoffModel: ITimeoff = { username :"", date: "", endDate: "", status: "pending", userId: 0 };

export const initialState: IInitialState = {
    users: [],
    shifts: [],
    timeoffs: [],
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
    newShift: {...newShiftModel},
    newTimeoff: {...newTimeoffModel},
    isCreateShiftInProgress: false,
    isRequestTimeoff: false
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
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                successfulRegisterMessage: "User has been registered successfully",
                newUser: {...newUserModel},
                errorRegisterMessage: "",
                isCreateUserInProgress: false
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
                isCreateUserInProgress: false,
                successfulRegisterMessage: "",
                errorRegisterMessage: ""
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                newUser: {...newUserModel},
                newShift: {...newShiftModel}
            };
        case USERS:
            return {
                ...state,
                users: action.payload.users
            };
        case CREATE_SHIFT:
            return {
                ...state,
                isCreateShift: true,
                isAdminViewShifts: false,
                newShift: action.payload ? action.payload.newShift : {...newShiftModel}
            };
        case CREATE_SHIFT_SUBMIT:
            return {
                ...state,
                isCreateShiftInProgress: true
            };
        case CREATE_SHIFT_SUCCESS:
            return {
                ...state,
                shifts: [...state.shifts, action.payload.submittedShift],
                isCreateShiftInProgress: false,
                newShift: {...newShiftModel}
            };
        case CREATE_SHIFT_CANCEL:
            return {
                ...state,
                isCreateShiftInProgress: false,
                newShift: {...newShiftModel}
            };
        case VIEW_SHIFTS:
            return {
                ...state,
                isCreateShift: false,
                isAdminViewShifts: true,
                newShift: {...newShiftModel},
                shifts: action.payload.shifts,
                errorMessage: ''
            };
        case VIEW_SHIFTS_ERROR:
            return {
                ...state,
                isCreateShift: false,
                isAdminViewShifts: true,
                newShift: {...newShiftModel},
                errorMessage: action.payload.message
            };
        case REQUEST_SHIFT_TAKEOVER:
            return {
                ...state,
                isCreateShift: false,
                isAdminViewShifts: true,
                newShift: {...newShiftModel},
                shifts: state.shifts.map(each => {
                    if (each.id === action.payload.updatedShift.id) {
                        return action.payload.updatedShift;
                    }
                    return each;
                }),
                errorMessage: ''
            };
        case VIEW_TIMEOFFS:
            return {
                ...state,
                timeoffs: action.payload.timeoffs
            };
        case VIEW_TIMEOFFS_ERROR:
            return {
                ...state,
                errorMessage: action.payload.message,
                timeoffs: []
            };
        case REQUEST_TIMEOFF:
            return {
                ...state,
                isRequestTimeoff: true,
                newTimeoff: action.payload.newTimeoff
            };
        case REQUEST_TIMEOFF_SUCCESS:
            return {
                ...state,
                isRequestTimeoff: true,
                timeoffs: [...state.timeoffs, action.payload.timeoff],
                newTimeoff: {...newTimeoffModel}
            };
        case REQUEST_TIMEOFF_ERROR:
            return {
                ...state,
                errorMessage: action.payload.message,
                //timeoffs: []
            };
        case TIMEOFF_UPDATE_STATUS:
            return {
                ...state,
                timeoffs: state.timeoffs.map(timeo => {
                    if (timeo.id === action.payload.timeoff.id) {
                        return action.payload.timeoff;
                    }
                    return timeo;
                })
            };
        case ACCEPT_AVAILABLE_SHIFT:
            return {
                ...state,
                shifts: state.shifts.map(each => {
                    if (each.id === action.payload.updatedShift.id) {
                        return action.payload.updatedShift;
                    }
                    return each;
                })
            }
        default:
            return state;

    }
}