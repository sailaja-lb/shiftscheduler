import React, {useEffect} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state";
import {viewAllUsers} from "../state/schedulerActions";

function UsersHome() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state:AppState) => state.schedulerState.loggedInUser);
    const users = useSelector((state:AppState) => state.schedulerState.users);

    useEffect(() => {
        if (loggedInUser && loggedInUser.role === 'admin') {
            dispatch(viewAllUsers());
        }
    }, [dispatch, loggedInUser])

    return (
        <>
            <Header />
            <main>
                <table>
                    <thead>
                        <th>id</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            //Keys are used in React to identify which items in the list are changed, updated, or deleted.
                            //Keys are used to give an identity to the elements in the lists
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}
export default UsersHome;