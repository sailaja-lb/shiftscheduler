import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import Header from "./Header";
import ViewTimeoff from "./ViewTimeoff";
import {viewAllTimeoffs, viewUserTimeoffs} from "../state/schedulerActions";
import { ITimeoff, IUser} from "../state/schedulerTypes";
import ViewRequestTimeOff from "./ViewRequestTimeOff";

function TimeoffHome() {
    const dispatch = useDispatch();
    const loggedInUser: IUser | null = useSelector((state:AppState) => state.schedulerState.loggedInUser);
    const timeoffs: ITimeoff[] = useSelector((state:AppState) => state.schedulerState.timeoffs);

    useEffect(() => {
        if (loggedInUser && loggedInUser.id) {
            if (loggedInUser.role !== 'admin') {
                dispatch(viewUserTimeoffs(loggedInUser.id));
            } else {
                dispatch(viewAllTimeoffs());
            }
        }
    }, [dispatch, loggedInUser]);

    return (
        <>
            <Header />
            <main>
                {loggedInUser ? ( <>
                    <ViewRequestTimeOff />
                    <ViewTimeoff timeoffs={timeoffs} loggedInUser={loggedInUser} />
                </>) : null}
            </main>
        </>
    );
}
export default TimeoffHome;