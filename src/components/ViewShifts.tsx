import React from "react";
import {IShift, IUser} from "../state/schedulerTypes";

interface propsViewShifts {
    shifts: IShift[];
    loggedInUser: IUser;
}
function ViewShifts(props: propsViewShifts) {
    const { shifts, loggedInUser } = props;
    const { role, id:loggedInUserId } = loggedInUser;

    return (
        <>
            <table>
                <thead>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Assigned user</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {shifts.map((shift: IShift) => (
                        <tr key={shift.id}>
                            <td>{shift.id}</td>
                            <td>{shift.title}</td>
                            <td>{new Date(shift.date).toLocaleString()}</td>
                            <td>{shift.userId}</td>
                            <td>
                                {role === 'user' && shift.userId === loggedInUserId ? <button>Request</button> : null}
                                {role === 'user' && shift.userId === 0 ? <button>Accept</button> : null}
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