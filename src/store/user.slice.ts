import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { LoginResponse } from "../pages/Login/Auth.interface";
import { PREFIX } from "../helpers/api";
import axios, { AxiosError } from "axios";
import { Profile } from "../interfaces/user.interface";
import { RootState, typeAppDispatch } from "./store";

export const KEY = "userData";

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string;
    registerErrorMessage?: string;
    profile?: Profile;
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(KEY)?.jwt ?? null
};

type AsyncThunkConfig = {
    state?: RootState;
    dispatch?: typeAppDispatch;
};

export const login = createAsyncThunk<
    LoginResponse | undefined,
    {
        email: string;
        password: string;
    },
    AsyncThunkConfig
>("user/login", async (params: { email: string; password: string }) => {
    try {
        const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
            email: params.email,
            password: params.password
        });
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message);
        }
    }
});

export const register = createAsyncThunk<
    LoginResponse | undefined,
    {
        email: string;
        password: string;
        name: string;
    },
    AsyncThunkConfig
>("user/register", async (params: { email: string; password: string; name: string }) => {
    try {
        const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
            email: params.email,
            password: params.password,
            name: params.name
        });
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message);
        }
    }
});

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
    "user/profile",
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().user.jwt;
        const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });
    }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
