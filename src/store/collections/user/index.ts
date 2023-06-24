import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser, updateUser } from "../../thunks/user";
import { ICompany, IUser } from "../../../types/Type";
import { hyphinize } from "../../../util/string";

export interface UserState {
  data: IUser;
  error?: string;
  isLoading?: boolean;
}

export type UpdateUserPayload = Pick<IUser, "id"> & {
  onboarding?: boolean;
  given_name?: string;
  family_name?: string;
  companies?: ICompany[];
  subject_slugs?: string[];
};

export const initialState: UserState = {
  data: {
    id: "000000000000000000000",
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString(),
    name: "",
    onboarding: false,
    picture:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
    given_name: "",
    family_name: "",
    email: "",
    companies: [
      {
        name: "",
        logo: "",
        description: "",
      },
    ],
    subject_slugs: ["english"],
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
    logoutUser(state: any, action: PayloadAction<UpdateUserPayload>) {
      state.data = undefined;
    },
    setUser(state: UserState, action: PayloadAction<UpdateUserPayload>) {
      state.data = { ...state.data, ...action.payload };
    },
    addSubject(state: UserState, action: PayloadAction<UpdateUserPayload>) {
      const subjects = state.data.subject_slugs || [];
      let data = action.payload?.subject_slugs && action.payload?.subject_slugs[0];
      data = hyphinize(data as string);
      if (!subjects.includes(data)) {
        state.data.subject_slugs?.push(data);
      }
    },
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
    builder.addCase(updateUser.fulfilled, (state: UserState, action) => {
      state.isLoading = false;
      if (action.payload.data.given_name) {
        state.data.given_name = action.payload.data.given_name;
      }
      if (action.payload.data.family_name) {
        state.data.family_name = action.payload.data.family_name;
      }
      if (action.payload.data.onboarding) {
        state.data.onboarding = action.payload.data.onboarding;
      }
      if (action.payload.data.companies) {
        state.data.companies = action.payload.data.companies || [];
      }
    });
  },
});

export const { setUser, logoutUser, addSubject } = userSlice.actions;
export default userSlice.reducer;
