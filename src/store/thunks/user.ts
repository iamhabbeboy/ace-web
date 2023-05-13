import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/Type";
import { initialState } from "../collections/user";
import { UserState } from "../collections/user/index";
import {Axios} from "../../util/axios.lib";

export const createUser = createAsyncThunk("user/create", async (payload: IUser, { rejectWithValue }) => {
  try {
    console.log(payload)
    const { data } = await Axios.post<IUser>("/api/v1/accounts", payload);
    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const getUser = createAsyncThunk<
  UserState,
  { id: string },
  { rejectValue: string }
>("user/get", async (id, { rejectWithValue }) => {
  try {
    // const { data } = await axios.get(`/api/accounts/${payload}`);
    return initialState;
  } catch (err: any) {
    return rejectWithValue("error occured");
  }
});

