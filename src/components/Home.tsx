import React from 'react';
import Login from "./Login";
import {useSelector} from "react-redux";
import {AppState} from "../state";
import Header from "./Header";

function Home({_useSelector = useSelector, _Header = Header, _Login = Login}) {
    const isLoggedIn: boolean = useSelector((state: AppState) =>
        state.schedulerState.isLoggedIn);

    return (
        <>
            <Header />
            <main>
                { !isLoggedIn ? <Login /> : <h1>Welcome to the SCHEDULER App</h1>}
            </main>
        </>
    );
}

export default Home;
