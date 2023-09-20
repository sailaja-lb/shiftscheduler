import React from 'react';
import './App.css';
import Home from './components/Home';
import {Provider} from "react-redux";
import {store} from "./state";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import CreateUser from "./components/CreateUser";
import ShiftsHome from "./components/ShiftsHome";
import TimeoffHome from "./components/TimeoffHome";
import UsersHome from "./components/UsersHome";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/createuser" element={<CreateUser />} />
                        <Route path="/shifts" element={<ShiftsHome />} />
                        <Route path="/timeoff" element={<TimeoffHome />} />
                        <Route path="/users" element={<UsersHome />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
