import React from "react";
import ReactDOM from "react-dom";
import "fonts/The Northern Block Ltd - Typold Regular.otf";
import "scss/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "contexts";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
