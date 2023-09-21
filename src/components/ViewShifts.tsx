import React from "react";
import {IShift, IUser} from "../state/schedulerTypes";
import {shiftsAPI} from "../restAPI";
import {useDispatch} from "react-redux";
import {updateShift} from "../state/schedulerActions";

interface propsViewShifts {
    shifts: IShift[];
    loggedInUser: IUser;
}
function ViewShifts(props: propsViewShifts) {
    const dispatch = useDispatch();

    const { shifts, loggedInUser } = props;
    const { role, id:loggedInUserId } = loggedInUser;

    const acceptShift = (shiftId: number | undefined) => () => {
        if (shiftId) {
            const selectedShift: IShift | undefined = shifts.find(each => each.id === shiftId);
            if (selectedShift) {
                dispatch(updateShift({...selectedShift, userId: loggedInUserId}));
            }
        }
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
                            <td>{shift.userId}</td>
                            <td>
                                {role === 'user' && shift.userId === loggedInUserId ? <button>Request</button> : null}
                                {role === 'user' && shift.userId === 0 ? <button onClick={acceptShift(shift.id)}>Accept</button> : null}
                                {role === 'admin' && shift.userId === 0 ? <button>Assign</button> : null}
                            </td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
        </>
    );
}
export default ViewShifts;