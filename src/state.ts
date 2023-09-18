import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import {initialState, schedulerReducer} from "./state/schedulertReducer";
import {IInitialState} from "./state/schedulerTypes";


const reducer = combineReducers({
    schedulerState: schedulerReducer
});

export default function configureStore(preloadedState: any) {
    const middlewares = [ReduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    //Thunk is middleware
    //DevTools is an enhancer (actually changes Redux)
    //applyMiddleware wraps middleware and returns an enhancer

    // to use only thunk middleware
    // const enhancer = compose(middlewareEnhancer);

    //to use thunk & devTools
    const enhancer = composeWithDevTools(middlewareEnhancer);

    return createStore(reducer, preloadedState, enhancer);

}

export interface AppState {
    schedulerState: IInitialState
}

export const initialAppState: AppState = {
    schedulerState: initialState
};

export const store = configureStore(initialAppState);