// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./app/providers"; // ✅ add this

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="552048820948-78t8a513t33sfa2v69ileqt3uk8jje6g.apps.googleusercontent.com">
      <Provider store={store}>
        <ThemeProvider>   {/* ✅ wrap here */}
          <App />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
