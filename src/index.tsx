import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 스포티파이는 redirect URI 로 localhost 를 허용하지 않아서 로컬 개발은 127.0.0.1 로 한다.
// localhost 와 127.0.0.1 은 브라우저가 다른 사이트로 봐서 localStorage(로그인용 code_verifier)도 따로 쓴다.
// 그래서 localhost 로 들어오면 같은 주소의 127.0.0.1 로 옮긴다.
if (window.location.hostname === "localhost") {
	window.location.replace(window.location.href.replace("//localhost", "//127.0.0.1"));
}

const root = ReactDOM.createRoot(document.getElementById("content") as HTMLElement);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1, // 요청이 실패하면 1번만 다시 시도한다
		},
	},
});
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				{/* css 스타일로 일정하게 맞춰줌. app ui에서 기본적으로 제공해주는 것. 어느 브라우저든 동일성이 보장된다.*/}
				<CssBaseline />
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
