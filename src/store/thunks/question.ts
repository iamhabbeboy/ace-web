import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginatedQuestion, IQuestion } from "../../types/Type";
import { Axios, Axios as axios } from "../../util/axios.lib";

export const createQuestion = createAsyncThunk(
  "question/create",
  async (payload: Partial<IQuestion>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IQuestion>(`/questions`, payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
// http://localhost:9200/api/v1/courses/questions?next_cursor=64c2ad7c1120738509316f85&subject_slug=english
export const getQuestionsWithFilter = createAsyncThunk(
  "question/filter/get",
  async (
    payload: { subject?: string; page?: number; },
    { rejectWithValue }
  ) => {
    try {
      let url = "/courses/questions";
      if (payload.subject) {
        url += `?subject_slug=${payload.subject}`;
      }
      if (payload.page) {
        url += `&page=${payload.page}`;
      }
      const { data } = await Axios.get<IPaginatedQuestion>(url, {
        withCredentials: true,
      });
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
      const { data } = await Axios.get<IQuestion>(`/questions/${id}`, {
        withCredentials: true,
      });
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
