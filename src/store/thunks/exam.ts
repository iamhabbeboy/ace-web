import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExam } from "../../types/Type";
import { Axios } from "../../util/axios.lib";
import axios, { AxiosError } from "axios";

export const createExam = createAsyncThunk(
  "exam/create",
  async (payload: Partial<IExam>, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post<IExam>("/exams", payload);
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

export const fetchExam = createAsyncThunk("exam/get", async () => {
  try {
    const { data } = await Axios.get<IExam>("/exams");
    return data;
  } catch (err: any) {
    // return rejectWithValue("error occured");
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
