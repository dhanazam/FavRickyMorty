import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import {
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import { authReducer } from "@state/slices/authSlice";
import { charactersReducer } from "@state/slices/characterSlice";
import initialState from "@state/store/initialState";
import { Api } from "@api/api";
import reactotronConfig from "../../../reactotron-config";

const apiService = Api.getInstance();

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
};

const combinedReducer = combineReducers({
    auth: authReducer,
    characters: charactersReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    preloadedState: initialState,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { apiService },
            },
        }),
    enhancers: [reactotronConfig.createEnhancer!()]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

/*
configureStore
- holds the state tree of your application
- use dispatch action to change state

ReturnType
- construct a type consisting the return type of function
**/
