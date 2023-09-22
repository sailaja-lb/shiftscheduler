import React, {useRef, useState} from "react";
import {CREATE_SHIFT_CANCEL, IShift, IUser} from "../state/schedulerTypes";
import {shiftsAPI} from "../restAPI";
import {useDispatch} from "react-redux";
import {updateRequestShift, updateShift} from "../state/schedulerActions";

interface propsViewShifts {
    shifts: IShift[];
    loggedInUser: IUser;
    users?: IUser[];
}
function ViewShifts(props: propsViewShifts) {
    const dispatch = useDispatch();
    const [selectedShiftId, setSelectedShiftId] = useState<number>(0);
    const [shiftAssignedId, setShiftAssignedId] = useState<number>(0);

    const { shifts, loggedInUser, users } = props;
    const { role, id:loggedInUserId } = loggedInUser;

    const acceptShift = (shiftId: number | undefined) => () => {
        if (shiftId) {
            const selectedShift: IShift | undefined = shifts.find(each => each.id === shiftId);
            if (selectedShift) {
                dispatch(updateShift({...selectedShift, userId: loggedInUserId}));
            }
        }
    }
    const updateShiftTakeover = (shiftId: number | undefined) => () => {
        if (shiftId) {
            const selectedShift: IShift | undefined = shifts.find(each => each.id === shiftId);
            if (selectedShift) {
                dispatch(updateRequestShift({...selectedShift, userId: 0}));
            }
        }
    }
    const submitAssignShift = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selectedShift: IShift | undefined = shifts.find(each => each.id === selectedShiftId);
        if (selectedShift) {
            dispatch(updateShift({...selectedShift, userId: shiftAssignedId}));
        }
    }
    const handleAssignShiftChange = (event: any) => {
        setShiftAssignedId(Number(event.target.value))
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Start Time</th>
                        <th>End time</th>
                        <th>Assigned user</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift: IShift) => (
                        <tr key={shift.id}>
                            <td>{shift.id}</td>
                            <td>{shift.title}</td>
                            <td>{new Date(shift.date).toLocaleString()}</td>
                            <td>{new Date(shift.endDate).toLocaleString()}</td>
                            <td>{shift.userId === 0 ? "Unassined" : shift.userId }</td>
                            <td>
                                {role === 'user' && shift.userId === loggedInUserId ? <button onClick={updateShiftTakeover(shift.id)}>Request</button> : null}
                                {role === 'user' && shift.userId === 0 ? <button onClick={acceptShift(shift.id)}>Claim</button> : null}
                                {role === 'admin' && shift.userId === 0 ? <label htmlFor="modal-control" className={"button"} onClick={() => setSelectedShiftId(Number(shift.id))}>Assign</label> : null}
                            </td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
            <input type="checkbox" id="modal-control" className="modal" />
            <div role="dialog" aria-labelledby="dialog-title">
                <div className="card">
                    <label htmlFor="modal-control" className="modal-close"></label>
                    <h3 className="section" id="dialog-title">Assign Shift</h3>
                    <div>
                        <form className="input-group vertical" onSubmit={submitAssignShift}>
                            <label htmlFor="assigneduser">User</label>
                            <select name="assigneduser" required={true} value={shiftAssignedId} onChange={handleAssignShiftChange}>
                                {users && users.map(user =>
                                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                )}
                            </select>
                            <div className="input-group">
                                <button className="primary bordered medium" type={"submit"}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ViewShifts;