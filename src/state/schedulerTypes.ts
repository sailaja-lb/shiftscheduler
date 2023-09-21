//action types

export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const CREATE_USER = 'CREATE_USER'
export const USERS = 'USERS'
export const CREATE_USER_SUBMIT = 'CREATE_USER_SUBMIT'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const CREATE_USER_CANCEL = 'CREATE_USER_CANCEL'
export const LOGOUT = 'LOGOUT'
export const CREATE_SHIFT = 'CREATE_SHIFT';
export const CREATE_SHIFT_SUBMIT = 'CREATE_SHIFT_SUBMIT';
export const CREATE_SHIFT_SUCCESS = 'CREATE_SHIFT_SUCCESS';
export const CREATE_SHIFT_ERROR = 'CREATE_SHIFT_ERROR';
export const CREATE_SHIFT_CANCEL = 'CREATE_SHIFT_CANCEL';
export const VIEW_SHIFTS = 'VIEW_SHIFTS';
export const VIEW_SHIFTS_ERROR = 'VIEW_SHIFTS_ERROR';
export const VIEW_TIMEOFFS = 'VIEW_TIMEOFFS';
export const VIEW_TIMEOFFS_ERROR = 'VIEW_TIMEOFFS_ERROR';
export const REQUEST_TIMEOFF = 'REQUEST_TIMEOFF';
export const REQUEST_TIMEOFF_SUCCESS = 'REQUEST_TIMEOFF_SUCCESS';
export const REQUEST_TIMEOFF_ERROR = 'REQUEST_TIMEOFF_ERROR';
export const TIMEOFF_UPDATE_STATUS = 'TIMEOFF_UPDATE_STATUS';
export const ACCEPT_AVAILABLE_SHIFT = 'ACCEPT_AVAILABLE_SHIFT';

// User type
export interface IUser {
    "id"?: number,
    "firstName": string,
    "lastName": string,
    "username": string,
    "password": string,
    "role": string
}
export interface ICredentials {
    username: string,
    password: string
}
export interface IShift {
    id?: number;
    title: string;
    date: string;
    userId?: number;
}

export interface ITimeoff {
    id?: number;
    date: string;
    endDate: string;
    userId: number;
    status: string;
}

// InitialState
export interface IInitialState {
    users: IUser[],
    shifts: IShift[],
    timeoffs: ITimeoff[],
    isLoggedIn: boolean,
    isRegister: boolean,
    loggedInUser: IUser | null,
    successfulRegisterMessage: string,
    loginErrorMessage: string,
    page: number,
    loginPending: boolean,
    registerPending: boolean,
    credentials: ICredentials,
    newUser: IUser,
    loginDisabled: boolean,
    isCreateUserInProgress: boolean,
    errorRegisterMessage: string,
    isCreateShift: boolean,
    isAdminViewShifts: boolean,
    newShift: IShift,
    isCreateShiftInProgress: boolean,
    newTimeoff: ITimeoff,
    isRequestTimeoff: boolean
}

export interface IUpdateCredentials {
    type: typeof UPDATE_CREDENTIALS;
    payload: {credentials: ICredentials};
}
export interface ILoginStart {
    type: typeof LOGIN_START;
}
export interface LoginError {
    type: typeof LOGIN_ERROR;
    payload: {message: string}
}
export interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: IUser
}
export interface ICreateUser {
    type: typeof CREATE_USER;
    payload: { newUser: IUser };
}
export interface ICreateUserSubmit {
    type: typeof CREATE_USER_SUBMIT;
}
export interface ICreateUserSuccess {
    type: typeof CREATE_USER_SUCCESS;
}
export interface ICreateUserCancel {
    type: typeof CREATE_USER_CANCEL;
}
export interface ICreateUserError {
    type: typeof CREATE_USER_ERROR;
    payload: { message: string };
}
export interface ICreateShift {
    type: typeof CREATE_SHIFT;
    payload: { newShift: IShift }
}

export interface ICreateShiftSubmit {
    type: typeof CREATE_SHIFT_SUBMIT;
}
export interface ICreateShiftSuccess {
    type: typeof CREATE_SHIFT_SUCCESS;
    payload: { submittedShift: IShift }
}
export interface ICreateShiftError {
    type: typeof CREATE_SHIFT_ERROR;
    //why no payload
}
export interface ICreateShiftCancel {
    type: typeof CREATE_SHIFT_CANCEL;
}
export interface IViewShifts {
    type: typeof VIEW_SHIFTS;
    payload: { shifts: IShift[] }
}
export interface IViewShiftsError {
    type: typeof VIEW_SHIFTS_ERROR;
    payload: { message: string }
}
export interface IViewTimeoffs {
    type: typeof VIEW_TIMEOFFS;
    payload: { timeoffs: ITimeoff[] }
}
export interface IViewTimeoffsError {
    type: typeof VIEW_TIMEOFFS_ERROR;
    payload: { message: string }
}
export interface IRequestTimeoff {
    type: typeof REQUEST_TIMEOFF;
    payload: { newTimeoff: ITimeoff }
}
export interface IRequestTimeoffsError {
    type: typeof REQUEST_TIMEOFF_ERROR;
    payload: { message: string }
}
export interface IRequestTimeoffSuccess {
    type: typeof REQUEST_TIMEOFF_SUCCESS;
    payload: { timeoff: ITimeoff }
}
export interface ITimeoffUpdateStatus {
    type: typeof TIMEOFF_UPDATE_STATUS;
    payload: { timeoff: ITimeoff };
}
interface Logout {
    type: typeof LOGOUT;
}
export interface Users {
    type: typeof USERS;
    payload: { users: IUser[] };
}

export interface IAcceptAvailableShift {
    type: typeof ACCEPT_AVAILABLE_SHIFT;
    payload: { updatedShift: IShift }
}

export type ActionTypes =
    | IUpdateCredentials
    | ILoginStart
    | LoginError
    | LoginSuccess
    | ICreateUser
    | ICreateUserSubmit
    | ICreateUserSuccess
    | ICreateUserCancel
    | ICreateUserError
    | ICreateShift
    | ICreateShiftSubmit
    | ICreateShiftSuccess
    | ICreateShiftError
    | ICreateShiftCancel
    | IViewShifts
    | IViewShiftsError
    | IViewTimeoffs
    | IViewTimeoffsError
    | Logout
    | Users
    | IRequestTimeoff
    | IRequestTimeoffSuccess
    | ITimeoffUpdateStatus
    | IAcceptAvailableShift
    | IRequestTimeoffsError;
