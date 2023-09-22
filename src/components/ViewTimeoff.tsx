import React from "react";
import { ITimeoff, IUser} from "../state/schedulerTypes";
import {useDispatch} from "react-redux";
import {updateRequestTimeoff} from "../state/schedulerActions";

interface propsViewTimeoff {
    timeoffs: ITimeoff[];
    loggedInUser: IUser;
}
function ViewTimeoff(props: propsViewTimeoff) {
    const dispatch = useDispatch();

    const { timeoffs, loggedInUser } = props;
    const { role } = loggedInUser;

    const updateTimeoffStatus = (timeoffId: number | undefined, status: string) => () => {
        if (timeoffId) {
            const updateTimeoff: ITimeoff | undefined = timeoffs.find(timeo => timeo.id === timeoffId);
            if (updateTimeoff) {
                dispatch(updateRequestTimeoff({...updateTimeoff, status}));
            }
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        {(role === 'admin') ? <th>Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                {timeoffs.map((timeoff: ITimeoff, index) => (
                        <tr key={index}>
                            <td>{timeoff.userId}</td>
                            <td>{new Date(timeoff.date).toLocaleString()}</td>
                            <td>{new Date(timeoff.endDate).toLocaleString()}</td>
                            <td>{timeoff.status}</td>
                            {(role === 'admin') ? (<td>
                                {(timeoff.status === 'pending') ? (<>
                                    <button onClick={updateTimeoffStatus(timeoff.id, 'approved')}>Approve</button>
                                    <button onClick={updateTimeoffStatus(timeoff.id, 'denied')}>Deny</button>
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