import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnswer } from "../../types/Type";
import { Axios } from "../../util/axios.lib";
import axios, { AxiosError } from "axios";

export const createOrUpdateAnswer = createAsyncThunk("answer/create",
  async (payload: Partial<IAnswer>, { rejectWithValue }) => {
    try {
        console.log(payload)
        console.log("here---")
      const { data } = await Axios.get<IAnswer>("/answers");
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
