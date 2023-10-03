import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from "../components/Home";
import { Provider } from 'react-redux';
import configureStore, {initialAppState, store} from "../state";

describe('Test Home component', () => {

    it('should render login screen', () => {
        render(
            <Provider store={store}>
                <Home />;
            </Provider>
        );

        expect(screen.getByTestId('username')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
    });

    it('should render home screen after successful login', () => {
        const preloadedTestState = {
            schedulerState: { ...initialAppState.schedulerState, isLoggedIn: true, loggedInUser: { firstName: "test", lastName: "test", username: "test"}}
        };
        const store = configureStore(preloadedTestState);
        render(
            <Provider store={store}>
                <Home />;
            </Provider>
        );

        expect(screen.getByText('Welcome to the SCHEDULER App')).toBeInTheDocument();

    });



});
