import { InforUser, RegisterForm } from '@/models';
import { User } from '@/models/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    logging?: boolean;
    registering?: boolean;
    actionAuth: 'No action' | 'Success' | 'Failed';
    currentUser?: InforUser;
}

const initialState: AuthState = {
    logging: false,
    registering: false,
    actionAuth: 'No action',
    currentUser: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.logging = true;
            state.actionAuth = 'No action';
        },

        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.actionAuth = 'Success';
            state.currentUser = action.payload.data;
        },
        loginFailed(state) {
            state.logging = false;
            state.actionAuth = 'Failed';
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        register(state, action) {
            state.registering = true;
            state.actionAuth = 'No action';
        },
        registerSuccess(state, action: PayloadAction<User>) {
            state.registering = false;
            state.actionAuth = 'Success';
            state.currentUser = action.payload.data;
        },
        registerFailed(state) {
            state.registering = false;
            state.actionAuth = 'Failed';
        },
        logout(state) {
            state.logging = false;
            state.registering = false;
            state.actionAuth = 'No action';
            state.currentUser = undefined;
        },
        resetAction(state) {
            state.actionAuth = 'No action';
        },
        // ...các action khác
    },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
