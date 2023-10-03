import React from 'react';
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore, {initialAppState, store} from "../state";
import Header from "../components/Header";

describe('Test Header component', () => {
    it('should render Header screen', () => {
        render(
            <Provider store={store}>
                <Header/>;
            </Provider>
        );

        expect(screen.getByText('SCHEDULER')).toBeInTheDocument();

    });
    it('should render all the tabs in the screen when role is admin', () => {
        const preloadedTestState = {
            schedulerState: {...initialAppState.schedulerState, isLoggedIn: true, loggedInUser: {role: "admin"}}
        };
        const store = configureStore(preloadedTestState);
        render(
            <Provider store={store}>
                <Header/>;
            </Provider>
        );
        expect(screen.getByText('Shifts')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Time off')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByText('Create User')).toBeInTheDocument();
    });

    it('should render all the tabs in the screen when role is user', () => {
        const preloadedTestState = {
            schedulerState: {...initialAppState.schedulerState, isLoggedIn: true, loggedInUser: {role: "user"}}
        };
        const store = configureStore(preloadedTestState);
        render(
            <Provider store={store}>
                <Header/>;
            </Provider>
        );
        expect(screen.getByText('Shifts')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Time off')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();

    });
});