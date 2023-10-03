import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, {initialAppState, store} from "../state";
import Home from "../components/Home";
import Login from "../components/Login";

describe('Test Login component', () => {

    it('should render login screen', () => {
        render(
            <Provider store={store}>
                <Login />;
            </Provider>
        );

        expect(screen.getByTestId('username')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should show error message after unsuccessful login', () => {
        const preloadedTestState = {
            schedulerState: { ...initialAppState.schedulerState,
                loggedInUser: { firstName: "test", lastName: "test", username: "test"},
                loginErrorMessage : "username not found",
                loginDisabled : "disabled"}
        };
        const store = configureStore(preloadedTestState);
        render(
            <Provider store={store}>
                <Login />;
            </Provider>
        );

        expect(screen.getByText('username not found')).toBeInTheDocument();

    });



});
