import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExam } from "../../types/Type";
import { getToken } from "../../util/common";
import useAxios from "../../hooks/useAxios";
import axios, { Axios, AxiosError } from "axios";

const token = getToken();
const headers = {
    Authorization: `Bearer ${token}`
}
export const createExam = createAsyncThunk(
  "exam/create",
  async (payload: Partial<IExam>, { rejectWithValue }) => {
    try {
      const axios = useAxios();
      const { data } = await axios.post<IExam>("/exams", payload, {headers});
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

export const fetchExam = createAsyncThunk("exam/get", async (axios: Axios, { rejectWithValue }) => {
  try {
    const controller = new AbortController();
    const { data } = await axios.get<IExam>("/exams", {
      signal: controller.signal
  });
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
