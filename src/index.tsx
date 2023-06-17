import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { Notifications } from '@mantine/notifications';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
const elem = document.getElementById('root') as HTMLElement
elem.style.backgroundColor = "#f0f1f580";
const root = ReactDOM.createRoot(
  elem
);
root.render(

  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
              },
            },
          },
        }
      }}
    >
      <Notifications />
      <GoogleOAuthProvider clientId={clientID}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </GoogleOAuthProvider>
    </MantineProvider>
  </Provider>
);
/**
 * {
    "access_token": "ya29.a0AWY7CklnGxLEBxNS1OM7zqYbeLe42Ez-a2MV9TYbPD-7l7TKdTIx2ot8H6Tnml9VbC4JLOZidHr8Duh6BRc_ITJMoYbv5on4BPrClAx_mj7wFVdckeFvLmFGKMH2ZWxk1bE5TISSPa8ABmpZ4AXf9yahZ8ISaCgYKAQ8SARISFQG1tDrp8SO7NF6Hw9FDd0N7kxLcsQ0163",
    "token_type": "Bearer",
    "expires_in": 3599,
    "scope": "email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    "authuser": "2",
    "prompt": "consent"
}
 */
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
