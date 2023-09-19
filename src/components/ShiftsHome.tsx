import React from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {ADMIN_VIEW_SHIFTS, CREATE_SHIFT} from "../state/schedulerTypes";
import {AppState} from "../state";
import CreateShift from "./CreateShift";
function ShiftsHome() {
    const dispatch = useDispatch();
    const isCreateShift = useSelector((state: AppState) => state.schedulerState.isCreateShift);

    const showCreateShift = () => {
        dispatch({type: CREATE_SHIFT})
    }
    const showViewShifts = () => {
        dispatch({type: ADMIN_VIEW_SHIFTS})
    }

    return (
        <>
            <Header />
            <main>
                <div className="button-group">
                    <button onClick={showCreateShift}>Create Shift</button>
                    <button onClick={showViewShifts}>View Shifts</button>
                </div>
                {isCreateShift ? <CreateShift /> : null}
            </main>
        </>
    );
}

export default ShiftsHome;
