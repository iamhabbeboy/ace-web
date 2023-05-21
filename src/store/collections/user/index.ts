import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser, updateUser } from "../../thunks/user";
import { ICompany, ISubject, IUser } from "../../../types/Type";

export interface UserState {
  data: IUser;
  error?: string;
  isLoading?: boolean;
}

export type UpdateUserPayload = Pick<IUser, "oauth_user_id"> & {
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
    first_name: "",
    last_name: "",
    email: "",
    companies: [
      {
        name: "",
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
    // updateUser(state: UserState, action: PayloadAction<UpdateUserPayload>) {
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.rejected, (state: UserState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(
      createUser.fulfilled,
      (state: UserState, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    // Update fields
    builder.addCase(updateUser.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.rejected, (state: UserState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state: UserState, action: PayloadAction<any>) => {
        state.isLoading = false;
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
      }
    );

    // builder.addCase(updateUser.pending, (state: UserState) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateUser.rejected, (state: UserState, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // });
    // builder.addCase(
    //   updateUser.fulfilled,
    //   (state: UserState, action: PayloadAction<{}>) => {
    //     state.isLoading = false;
    //     // state.data = { ...state.data, action}
    //   }
    // );
  },
});

export default userSlice.reducer;
