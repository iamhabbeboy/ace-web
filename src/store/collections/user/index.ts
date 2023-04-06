import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    createUser, getUser,
  } from "../../thunks/user";
import { IUser } from "../../../types/User";

export interface UserState {
  data: IUser;
  error?: string;
  isLoading?: boolean;
}

export const initialState: UserState = {
  data: {
    id: "000000000000000000000",
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString(),
    avatar: "",
    oauth_user_id: "",
    first_name: "Abiodun",
    last_name: "Azeez",
    email: "iamhabbeboy@gmail.com",
    companies: [{
        name: "Bashlabs Innovation", 
        logo: "", 
        description: "",
    }],  
    username: "",
    password: "",
  },
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state: UserState) => {
        state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
    });
    builder.addCase(getUser.fulfilled, (state: UserState, action: PayloadAction<{}>) => {
        state.isLoading = false;
        // state.data = action.payload;
    });
  },
});

export default userSlice.reducer;
