import React from 'react';
import './App.css';
import Home from './components/Home';
import {Provider} from "react-redux";
import {store} from "./state";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import CreateUser from "./components/CreateUser";
import ShiftsHome from "./components/ShiftsHome";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/createuser" element={<CreateUser />} />
                        <Route path="/shifts" element={<ShiftsHome />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
