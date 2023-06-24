import { Middleware } from "@reduxjs/toolkit";

export const checkUserAccountType: Middleware = ({ getState }) => (next: any) => async (action: any) => {
    const { account } = getState();
    if(account.user.data.onboarding) {
    // store.dispatch({ type: 'URL_AUTHENTICATION', payload: isAuthenticated });
      return window.location.href = "/home"
    }

    return next(action);
  };
  