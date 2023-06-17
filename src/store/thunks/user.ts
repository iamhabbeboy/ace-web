import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoogleOauth, IUser } from "../../types/Type";
import { UpdateUserPayload, initialState } from "../collections/user";
import { UserState } from "../collections/user/index";
import { Axios } from "../../util/axios.lib";

export const createGoogleOauthUser = async (payload: IGoogleOauth) => {
  try {
    const { data } = await Axios.post<IUser>("/api/v1/users", payload);
    return data;
  } catch (err: any) {
    return err;
  }
};

export const createUser = createAsyncThunk(
  "user/create",
  async (payload: IUser, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post<IUser>("/api/v1/users", payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

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

export const updateUser = createAsyncThunk<
  UserState,
  UpdateUserPayload,
  { rejectValue: string }
>("user/update", async (payload, { rejectWithValue }) => {
  try {
    console.log(payload)
    const { data } = await Axios.put(
      `/api/v1/users/${payload.id}`,
      payload
    );
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
