import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { ISubject, IUser } from "../types/Type";

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
