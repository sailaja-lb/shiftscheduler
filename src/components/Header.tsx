import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import {IUser, LOGOUT} from "../state/schedulerTypes";

function Header() {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector((state: AppState) => state.schedulerState.isLoggedIn);
    const loggedInUser: IUser | null = useSelector((state: AppState) => state.schedulerState.loggedInUser);
    const handleLogout = () => {
        dispatch({type: LOGOUT});
    }

    return (
        <>
            <header className="sticky">
                <a href="#" className="logo">SCHEDULER</a>
                {isLoggedIn ? <>
                    <a href="#" className="button">Home</a>
                    <a href="#/shifts" className="button">Shifts</a>
                    <a href="#/timeoff" className="button">Time off</a>
                    { loggedInUser && loggedInUser.role === 'admin' ? <a href="#/createuser" className="button">Create User</a> : null}
                    <a href="/logout" className="button" onClick={handleLogout}>Logout</a>
                </> : null}
            </header>
        </>
    );
}

export default Header;
