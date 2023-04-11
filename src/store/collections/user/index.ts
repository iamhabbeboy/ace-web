import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../thunks/user";
import { ICompany, ISubject, IUser } from "../../../types/Type";

export interface UserState {
  data: IUser;
  error?: string;
  isLoading?: boolean;
}

export type UpdateUserPayload = Pick<IUser, "id"> & {
  first_name?: string;
  last_name?: string;
  companies?: ICompany[];
  subjects?: ISubject[];
};

export const initialState: UserState = {
  data: {
    id: "000000000000000000000",
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString(),
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
    oauth_user_id: "",
    first_name: "Abiodun",
    last_name: "Azeez",
    email: "iamhabbeboy@gmail.com",
    companies: [
      {
        name: "Bashlabs Innovation",
        logo: "",
        description: "",
      },
    ],
    subjects: [
      {
        name: "English",
        slug: "english",
        description: "",
      },
    ],
    username: "",
    password: "",
  },
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // getUser(state: UserState, action: PayloadAction<{}>) {
    //   return state.data;
    // },
    updateUser(state: UserState, action: PayloadAction<UpdateUserPayload>) {
      if (action.payload.first_name) {
        state.data.first_name = action.payload.first_name;
      }
      if (action.payload.last_name) {
        state.data.last_name = action.payload.last_name;
      }
      if (action.payload.subjects) {
        state.data.subjects = action.payload.subjects;
      }
      if (action.payload.companies) {
        state.data.companies = action.payload.companies || [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state: UserState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(
      getUser.fulfilled,
      (state: UserState, action: PayloadAction<{}>) => {
        state.isLoading = false;
        // state.data = action.payload;
      }
    );
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
