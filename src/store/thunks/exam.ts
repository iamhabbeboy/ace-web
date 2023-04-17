import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExam } from "../../types/Type";
import { ExamState, initialState } from "../collections/exam";
import { generate } from "shortid";

export const createExam = createAsyncThunk(
  "exam/create",
  async (payload: Partial<IExam>, { rejectWithValue }) => {
    try {
      // const { data } = await axios.post("/api/accounts", payload);
      payload.id = generate();
      return payload;
    } catch (err: any) {
      return rejectWithValue("error occured");
    }
  }
);

export const getExam = createAsyncThunk<
  ExamState,
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
