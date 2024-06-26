import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./redux";
import * as sessionActions from "./redux/session";
import { ModalProvider } from "./context/Modal";
import { restoreCSRF, csrfFetch } from './redux/csrf';
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ModalProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ModalProvider>
    </React.StrictMode>
);
