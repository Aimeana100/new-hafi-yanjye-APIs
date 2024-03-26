import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId="789303875610-cuhkfvk71qohmmijih1d6tmp1dtdlsk1.apps.googleusercontent.com">
		<React.StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</React.StrictMode>
	</GoogleOAuthProvider>
);
