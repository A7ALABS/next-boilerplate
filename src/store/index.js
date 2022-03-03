import logger from 'redux-logger';
import {
    applyMiddleware,
    createStore
} from 'redux';
import {
    createWrapper,
} from 'next-redux-wrapper';

import {
    CookieStorage
} from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

const SET_CLIENT_STATE = 'SET_CLIENT_STATE';

export const reducer = (state, {
    type,
    payload
}) => {
    // Usual stuff with HYDRATE handler
    if (type === SET_CLIENT_STATE) {
        return {
            ...state,
            fromClient: payload
        };
    }
    if (type === 'TOGGLE_THEME') {
        return {
            ...state,
            fromClient: {
                theme: payload
            }
        }
    }
    return state;
};

const makeConfiguredStore = (reducer) => {
    const {
        composeWithDevTools
    } = require("redux-devtools-extension");

    return createStore(reducer, undefined, composeWithDevTools(applyMiddleware(logger)));
}

const makeConfigServer = (reducer) =>
    createStore(reducer, undefined, applyMiddleware(logger));


const makeStore = () => {

    const isServer = typeof window === 'undefined';

    if (isServer) {

        return makeConfigServer(reducer);

    } else {

        // we need it only on client side
        const {
            persistStore,
            persistReducer
        } = require('redux-persist');

        const persistConfig = {
            key: 'mappe_v0.1',
            whitelist: ['fromClient'], // make sure it does not clash with server keys
            storage: new CookieStorage(Cookies)
        };

        const persistedReducer = persistReducer(persistConfig, reducer);
        const store = makeConfiguredStore(persistedReducer);

        store.__persistor = persistStore(store); // Nasty hack

        return store;
    }
};

export const wrapper = createWrapper(makeStore);

export const setClientState = (clientState) => ({
    type: SET_CLIENT_STATE,
    payload: clientState
});