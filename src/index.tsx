import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';

const elem = document.getElementById('root') as HTMLElement
elem.style.backgroundColor = "#f0f1f580";
const root = ReactDOM.createRoot(
  elem
);
root.render(
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
    <App />
  </MantineProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
