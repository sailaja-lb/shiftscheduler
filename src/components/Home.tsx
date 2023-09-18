import React from 'react';
import Login from "./Login";
import {useSelector} from "react-redux";
import {AppState} from "../state";
import Header from "./Header";

function Home() {
    const isLoggedIn: boolean = useSelector((state: AppState) => state.schedulerState.isLoggedIn);

    return (
        <>
            <Header />
            { !isLoggedIn ? <Login /> : null}
        </>
    );
}

export default Home;