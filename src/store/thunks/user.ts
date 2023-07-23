import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoogleOauth, IUser } from "../../types/Type";
import { UpdateUserPayload, initialState } from "../collections/user";
import { UserState } from "../collections/user/index";
import useAxios from "../../hooks/useAxios";
import axios from "../../util/axios.lib";

export const createGoogleOauthUser = async (payload: IGoogleOauth) => {
  try {
    const { data } = await axios.post<IUser>(`/signin`, payload, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return err;
  }
};
// export const createGoogleOauthUser = createAsyncThunk(
//   "google_oauth_user/create",
//   async (payload: IGoogleOauth, { rejectWithValue }) => {
//     try {
//       const axios = useAxios();
//       const { data } = await axios.post<IUser>("/signin", payload);
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const createUser = createAsyncThunk(
  "user/create",
  async (payload: IUser, { rejectWithValue }) => {
    try {
      const axios = useAxios();
      const { data } = await axios.post<IUser>("/users", payload);
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
    const axios = useAxios();
    const { data } = await axios.put(`/users/${payload.id}`, payload);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
