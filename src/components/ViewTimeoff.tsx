import React from "react";
import {IShift, ITimeoff, IUser} from "../state/schedulerTypes";

interface propsViewTimeoff {
    timeoffs: ITimeoff[];
    loggedInUser: IUser;
}
function ViewTimeoff(props: propsViewTimeoff) {
    const { timeoffs, loggedInUser } = props;
    const { role, id:loggedInUserId } = loggedInUser;

    return (
        <>
            <table>
                <thead>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    {(role === 'admin') ? <th>Actions</th> : null}
                </thead>
                <tbody>
                {timeoffs.map((timeoff: ITimeoff, index) => (
                        <tr key={index}>
                            <td>{timeoff.userId}</td>
                            <td>{new Date(timeoff.date).toLocaleString()}</td>
                            <td>{timeoff.status}</td>
                            {(role === 'admin') ? (<td>
                                {(timeoff.status === 'pending') ? (<>
                                    <button>Approve</button>
                                    <button>Deny</button>
                                </>): null}
                            </td>) : null}
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </>
    );
}
export default ViewTimeoff;