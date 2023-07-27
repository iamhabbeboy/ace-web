import { createAsyncThunk } from "@reduxjs/toolkit";
import { IQuestion } from "../../types/Type";
import { Axios as axios } from "../../util/axios.lib";
import { getToken } from "../../util/common";

const token = getToken();
const headers = {
    Authorization: `Bearer ${token}`
}

export const createQuestion = createAsyncThunk(
  "question/create",
  async (payload: Partial<IQuestion>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IQuestion>(
        `/questions`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const getQuestion = createAsyncThunk(
  "question/get",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IQuestion>(
        `/questions/${id}`,
        {headers}
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

// export const getQuestion = createAsyncThunk(
//   "question/get",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get<IQuestion>(
//         `/questions/${id}`,
//         {headers}
//       );
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err);
//     }
//   }
// );
