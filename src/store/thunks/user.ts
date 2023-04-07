import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/Type";
import { initialState } from "../collections/user";
import { UserState } from "../collections/user/index";

export const createUser = createAsyncThunk("user/create", async (payload: IUser, { rejectWithValue }) => {
  try {
    // const { data } = await axios.post("/api/accounts", payload);
    return payload;
  } catch (err: any) {
    return rejectWithValue("error occured");
  }
});

export const getUser = createAsyncThunk<
  UserState,
  { id: string | undefined },
  { rejectValue: string }
>("user/get", async (id, { rejectWithValue }) => {
  try {
    // const { data } = await axios.get(`/api/accounts/${payload}`);
    return initialState;
  } catch (err: any) {
    return rejectWithValue("error occured");
  }
});
