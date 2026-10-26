import axios, { InternalAxiosRequestConfig } from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { refreshAccessToken } from "../apis/authApi";

const api = axios.create({
	baseURL: SPOTIFY_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	},
});

// 요청을 보내기 직전마다 실행된다.
// 토큰을 axios.create 에 바로 넣으면 앱이 처음 켜질 때 값으로 고정돼서, 로그인 후에도 예전 토큰(null)을 보낸다.
// 그래서 요청할 때마다 localStorage 에서 최신 토큰을 읽어서 넣는다.
api.interceptors.request.use((request) => {
	request.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
	return request;
});

// 여러 요청이 동시에 401 을 받아도 토큰 재발급은 한 번만 하고, 나머지는 진행 중인 재발급을 같이 기다린다.
let refreshing: Promise<void> | null = null;

const refreshTokens = (refreshToken: string) => {
	if (!refreshing) {
		refreshing = refreshAccessToken(refreshToken)
			.then((data) => {
				localStorage.setItem("access_token", data.access_token);
				if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
			})
			.finally(() => {
				refreshing = null;
			});
	}
	return refreshing;
};

// 응답을 받은 직후마다 실행된다.
// access token 이 만료되면(1시간) 401 이 온다. 그때 refresh token 으로 새 토큰을 받아서 실패한 요청을 한 번 다시 보낸다.
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		// _retry : 다시 보낸 요청인지 표시. 다시 보낸 요청도 401 이면 또 재발급하지 않는다 (무한 반복 방지)
		const request = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
		const refreshToken = localStorage.getItem("refresh_token");
		if (!axios.isAxiosError(error) || error.response?.status !== 401 || !request || request._retry || !refreshToken) {
			return Promise.reject(error);
		}
		request._retry = true;
		try {
			await refreshTokens(refreshToken);
		} catch {
			// refresh token 도 못 쓰면 (만료됐거나 스포티파이에서 취소됨) 로그아웃 상태로 만든다. 다시 로그인해야 한다.
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			return Promise.reject(error);
		}
		return api(request); // 새 토큰은 위의 요청 interceptor 가 넣어준다
	},
);

export default api;
