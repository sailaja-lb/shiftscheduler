//action types
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const REGISTER = 'REGISTER'
export const REGISTER_CANCEL = 'REGISTER_CANCEL'
export const CREATE_USER = 'CREATE_USER'
export const USERS = 'USERS'
export const CREATE_USER_SUBMIT = 'CREATE_USER_SUBMIT'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const CREATE_USER_CANCEL = 'CREATE_USER_CANCEL'
export const LOGOUT = 'LOGOUT'
export const CREATE_SHIFT = 'CREATE_SHIFT';
export const ADMIN_VIEW_SHIFTS = "ADMIN_VIEW_SHIFTS";

// User tupe
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

// InitialState
export interface IInitialState {
    users: IUser[],
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
    isCreateShift: false,
    isAdminViewShifts: false;
    newShift: IShift;
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
export interface Register {
    type: typeof REGISTER;
}
export interface RegisterCancel {
    type: typeof REGISTER_CANCEL;
}
export interface ICreateUser {
    type: typeof CREATE_USER;
    payload: {newUser: IUser}
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
    payload: {message: string}
}
export interface ICreateShift {
    type: typeof CREATE_SHIFT;
}
export interface IAdminViewShifts {
    type: typeof ADMIN_VIEW_SHIFTS
}
interface Logout {
    type: typeof LOGOUT;
}
interface Users {
    type: typeof USERS;
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
    | IAdminViewShifts
    | Logout
    | Users;
