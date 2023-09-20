import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import Header from "./Header";
import ViewTimeoff from "./ViewTimeoff";
import {requestTimeoff, viewAllTimeoffs, viewUserTimeoffs} from "../state/schedulerActions";



function TimeoffHome() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state:AppState) => state.schedulerState.loggedInUser);
    const timeoffs = useSelector((state:AppState) => state.schedulerState.timeoffs);
    const isRequestTimeoff = useSelector((state: AppState) => state.schedulerState.isRequestTimeoff);

    useEffect(() => {
        if (loggedInUser && loggedInUser.id) {
            if (loggedInUser.role !== 'admin') {
                dispatch(viewUserTimeoffs(loggedInUser.id));
            } else {
                dispatch(viewAllTimeoffs());
            }
        }
    }, [dispatch, loggedInUser]);

    const showRequestTimeoff = () => {
        if (loggedInUser && loggedInUser.id)
        dispatch(requestTimeoff(loggedInUser.id));
    }


    return (
        <>
            <Header />
            <main>
                {loggedInUser ? (
                    loggedInUser?.role === 'admin' ? <ViewTimeoff timeoffs={timeoffs} loggedInUser={loggedInUser} /> : <><>
                        <button onClick={showRequestTimeoff} className={isRequestTimeoff ? 'primary' : ''} >Request Time off</button>
            </>
            <ViewTimeoff timeoffs={timeoffs} loggedInUser={loggedInUser}/></>

                ) : null}
            </main>
        </>
    );
}
export default TimeoffHome;