import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import {CREATE_SHIFT, CREATE_SHIFT_CANCEL} from "../state/schedulerTypes";
import {submitShift} from "../state/schedulerActions";

function CreateShift() {
    const dispatch = useDispatch();
    const {title, date, endDate, userId=0} = useSelector((state: AppState) => state.schedulerState.newShift);
    const users = useSelector((state: AppState) => state.schedulerState.users);
    const isCreateShiftInProgress = useSelector((state:AppState) => state.schedulerState.isCreateShiftInProgress);

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(submitShift({title, date, endDate, userId}));
    };
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const changeValue = {
            [name]: value
        };
        dispatch({type: CREATE_SHIFT, payload: {newShift: {title, date, endDate, userId, ...changeValue}}});
    };
    const handleCancel = () => {
        dispatch({type: CREATE_SHIFT_CANCEL})
    }

    return (
        <>
            <form className="input-group vertical" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} placeholder="Title" onChange={handleChange} required={true}/>
                <label htmlFor="date">Start Date</label>
                <input type="datetime-local" name="date" value={date} placeholder="Start Shift" onChange={handleChange} required={true}/>
                <label htmlFor="date">End Date</label>
                <input type="datetime-local" name="endDate" value={endDate} placeholder="End Shift" onChange={handleChange} required={true}/>
                <label htmlFor="userId">User (optional)</label>
                <select name={"userId"} onChange={handleChange}>
                    <option key={0}>-- Select user --</option>
                    {users.map(user => <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)}
                </select>
                <div className="input-group">
                    <button className="primary bordered medium" type={"submit"} disabled={isCreateShiftInProgress}>Submit</button>
                    <button type="button" className="bordered medium" disabled={isCreateShiftInProgress} onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default CreateShift;