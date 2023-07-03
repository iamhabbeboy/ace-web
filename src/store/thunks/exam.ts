import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExam } from "../../types/Type";
import { Axios } from "../../util/axios.lib";
import axios, { AxiosError } from "axios";
import { getToken } from "../../util/common";

const token = getToken();
const headers = {
    Authorization: `Bearer ${token}`
}

export const createExam = createAsyncThunk(
  "exam/create",
  async (payload: Partial<IExam>, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post<IExam>("/exams", payload, {headers});
      return data;
    } catch (err) {
      let error = err;
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        error = axiosError.response?.data;
      } 
      return rejectWithValue(error);
    }
  }
);

export const fetchExam = createAsyncThunk("exam/get", async (_, { rejectWithValue }) => {
  try {
    const { data } = await Axios.get<IExam>("/exams", { headers });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// export const getExamByUserId = createAsyncThunk<
//   ExamState,
//   { user_id: string },
//   { rejectValue: string }
// >("user/get", async (id, { rejectWithValue }) => {
//   try {
//     const { data } = await Axios.get(`/api/exams/${id}`);
//     return initialState;
//   } catch (err: any) {
//     return rejectWithValue("error occured");
//   }
// });

export const updateExam = createAsyncThunk(
  "exam/update",
  async (payload: IExam, { rejectWithValue }) => {
    try {
      // const { data } = await axios.post("/api/accounts", payload);
      return payload;
    } catch (err: any) {
      return rejectWithValue("error occured");
    }
  }
);
