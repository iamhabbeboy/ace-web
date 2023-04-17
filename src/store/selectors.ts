import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { IExam, ISubject, IUser } from "../types/Type";

export const selectUser = (state: RootState): IUser => state.account.user.data;

export const selectSubject = createSelector(
  [selectUser],
  (user: IUser): ISubject[] => user.subjects
);

export const selectCustomSubject = createSelector(
  [selectSubject],
  (subjects: ISubject[]): any => {
    return subjects.map((subject: ISubject) => {
      return { label: subject.name, value: subject.slug };
    });
  }
);

export const selectExam = (state: RootState): IExam[] => state.account.exam.data;

export const selectExamById = createSelector(
  [selectExam],
  (exams): IExam[] => {
    return exams.map((exam: IExam) => exam);
  }
);