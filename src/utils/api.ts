import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

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

export default api;
