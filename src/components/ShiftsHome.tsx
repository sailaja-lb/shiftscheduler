import React, {useEffect} from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import CreateShift from "./CreateShift";
import {createShift, viewAdminShifts, viewAllUsers, viewUserShifts} from "../state/schedulerActions";
import ViewShifts from "./ViewShifts";

function ShiftsHome() {
    const dispatch = useDispatch();
    const isCreateShift = useSelector((state: AppState) => state.schedulerState.isCreateShift);
    const isAdminViewShifts = useSelector((state:AppState) => state.schedulerState.isAdminViewShifts);
    const shifts = useSelector((state:AppState) => state.schedulerState.shifts);
    const users = useSelector((state:AppState) => state.schedulerState.users);
    const loggedInUser = useSelector((state:AppState) => state.schedulerState.loggedInUser);

    useEffect(() => {
        if (loggedInUser?.role !== 'admin') {
            if (loggedInUser?.id) {
                dispatch(viewUserShifts(loggedInUser?.id));
            }
        }
    }, [dispatch, loggedInUser]);

    useEffect(() => {
        dispatch(viewAllUsers())
    }, [users.length === 0]);

    const showCreateShift = () => {
        dispatch(createShift());
    }
    const showViewAdminShifts = () => {
        dispatch(viewAdminShifts());
    }

    return (
        <>
            <Header />
            <main>
                {loggedInUser ?
                    loggedInUser?.role === 'admin' ?
                        <>
                        <div className="button-group">
                            <button onClick={showCreateShift} className={isCreateShift ? 'primary' : ''}>Create Shift</button>
                            <button onClick={showViewAdminShifts} className={isAdminViewShifts ? 'primary' : ''}>View Shifts</button>
                        </div>
                        {isCreateShift ? <CreateShift /> : null}
                        {isAdminViewShifts ? <ViewShifts shifts={shifts} loggedInUser={loggedInUser} users={users} /> : null}
                        </>
                        : <ViewShifts shifts={shifts} loggedInUser={loggedInUser} />
                    : null}
            </main>
        </>
    );
}

export default ShiftsHome;
