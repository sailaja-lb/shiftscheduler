import React, {useEffect} from "react";
import {submitRequestTimeoff, viewAllTimeoffs, viewUserTimeoffs} from "../state/schedulerActions";
import {ITimeoff, IUser, REQUEST_TIMEOFF} from "../state/schedulerTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";



function ViewRequestTimeOff() {
    const dispatch = useDispatch();
    const loggedInUser: IUser | null = useSelector((state:AppState) => state.schedulerState.loggedInUser);
    const timeoffs: ITimeoff[] = useSelector((state:AppState) => state.schedulerState.timeoffs);
    const newTimeoff: ITimeoff = useSelector((state: AppState) => state.schedulerState.newTimeoff);
    const { date: startDate, endDate } = newTimeoff;


    useEffect(() => {
        if (loggedInUser && loggedInUser.id) {
            if (loggedInUser.role !== 'admin') {
                dispatch(viewUserTimeoffs(loggedInUser.id));
            } else {
                dispatch(viewAllTimeoffs());
            }
        }
    }, [dispatch, loggedInUser]);

    const handleRequestTimeoffChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const changedValue = {
            [name]: value
        };
        dispatch({type: REQUEST_TIMEOFF, payload: { newTimeoff: {...newTimeoff, userId: loggedInUser?.id, ...changedValue} }});
    }
    const handleRequestTimeoffSubmit = (event: React.SyntheticEvent<HTMLFormElement>) : void  => {
        event.preventDefault();
        dispatch(submitRequestTimeoff(newTimeoff));
    }

    return (
        <main>
                     <>
                         <label htmlFor="modal-control" className={"button"}>Request Time off</label>
                        <input type="checkbox" id="modal-control" className="modal" />
                        <div role="dialog" aria-labelledby="dialog-title">
                            <div className="card">
                                <label htmlFor="modal-control" className="modal-close"></label>
                                <h3 className="section" id="dialog-title">Request Time off</h3>
                                <div>
                                    <form className="input-group vertical" onSubmit={handleRequestTimeoffSubmit}>
                                        <label htmlFor="startdate">Start Date</label>
                                        <input type="datetime-local" name="date" value={startDate} required={true} onChange={handleRequestTimeoffChange} />
                                        <label htmlFor="startdate">End Date</label>
                                        <input type="datetime-local" name="endDate" value={endDate} required={true} onChange={handleRequestTimeoffChange} />
                                        <div className="input-group">
                                            <button className="primary bordered medium modal-" type={"submit"}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>

        </main>
);
}
export default ViewRequestTimeOff;