import React from 'react';
import './App.css';
import Home from './components/Home';
import {Provider} from "react-redux";
import {store} from "./state";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
