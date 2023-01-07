import auth from "@react-native-firebase/auth";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormValues } from "@screens/SigninScreen";
import { TThunkAPI, User } from "@state/types";
import defaultInitialState from "@state/store/initialState";
import { RootState } from "@state/store/configureStore";

export const login = createAsyncThunk<User, FormValues, TThunkAPI>(
    "auth/login",
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            return await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(UserCredential => {
                    return UserCredential.user.toJSON() as User;
                });
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.code);
        }
    },
);

export const logout = createAsyncThunk<void, void, TThunkAPI>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            return await auth().signOut();
        } catch (e) {
            return rejectWithValue(e.code);
        }
    },
);

export interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState = defaultInitialState.auth as AuthState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(logout.fulfilled, state => {
                state.user = null;
                state.loading = false;
            })
            .addMatcher(
                action => action.type.endsWith("/pending"),
                state => {
                    state.loading = true;
                },
            )
            .addMatcher(
                action => action.type.endsWith("/rejected"),
                state => {
                    state.loading = false;
                },
            );
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;

/*
createAsyncThunk
- a function that accepts a Redux action type string and payloadCreator callback that should return a promise
- return thunk action creator
- generic 
<
    return type of payload creator,
    first argument to payload creator,
    optional thunkapi
>

payloadCreator
- a callback function that should return promise containing asynchronous function
- 2 arguments
   - arg: single value that was passed to the thunk action creator
   - thunkAPI

dipatch
- to update the state and pass in an action object
- triggering an event

createSlice
- generates action creators and action types that correspond to the reducers and state

reducer
- are functions that take the current state and an action as arguments, and return a new state

action creator
- is a function that return an action object

extraReducers
- allows createSlice to respond to other action types besides the types it has generated

fulfilled
- final dispatch actions

addCase
- add reducer to handle a single exact action type
**/
