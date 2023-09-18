//action types
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const REGISTER = 'REGISTER'
export const REGISTER_CANCEL = 'REGISTER_CANCEL'
export const CREATE_USER = 'CREATE_USER'
export const USERS = 'USERS'
export const CREATE_USER_CANCEL = 'CREATE_USER_CANCEL'
export const LOGOUT = 'LOGOUT'
// User tupe
export interface IUser {
    "id": number,
    "firstName": string,
    "lastName": string,
    "username": string,
    "role": string
}
export interface ICredentials {
    username: string,
    password: string
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
    newUser: IUser | null,
    loginDisabled: boolean
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
interface CreateUser {
    type: typeof CREATE_USER;
}
interface Logout {
    type: typeof LOGOUT;
}
interface CreateUserCancel {
    type: typeof CREATE_USER_CANCEL;
}
interface Users {
    type: typeof USERS;
}

export type ActionTypes =
    | IUpdateCredentials
    | ILoginStart
    | LoginError
    | LoginSuccess
    | Register
    | RegisterCancel
    | CreateUser
    | Logout
    | CreateUserCancel
    | Users;
