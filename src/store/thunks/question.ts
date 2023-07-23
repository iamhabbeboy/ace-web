import { createAsyncThunk } from "@reduxjs/toolkit";
import { IQuestion } from "../../types/Type";
import { getToken } from "../../util/common";
import useAxios from "../../hooks/useAxios";
import { Axios } from "axios";
import { QuestionState } from "../collections/question";

const token = getToken();
const headers = {
  Authorization: `Bearer ${token}`,
};

export const createQuestion = createAsyncThunk(
  "question/create",
  async (payload: Partial<IQuestion>, { rejectWithValue }) => {
    try {
      const axios = useAxios();
      const { data } = await axios.post<IQuestion>(`/questions`, payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const getQuestion = createAsyncThunk<
IQuestion[],
  { axios: Axios; id: string },
  { rejectValue: string }
>("question/get", async ({ axios, id }, { rejectWithValue }) => {
  try {
    const controller = new AbortController();
    const { data } = await axios.get<IQuestion[]>(`/questions/${id}`, {
      signal: controller.signal
  });
    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});
