import axios from "axios";
import { CLIENT_ID, SECRET_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse, RefreshTokenResponse } from "../models/auth";

// const encodedBase64 = (data: string): string => {
// 	return Buffer.from(data).toString("base64");
// };

const encodedBase64 = (data: string): string => {
	if (typeof window !== "undefined") {
		// 브라우저 환경
		return btoa(data);
	} else {
		// Node.js 환경
		return Buffer.from(data).toString("base64");
	}
};

export const getClientCredientialToken = async (): Promise<ClientCredentialTokenResponse> => {
	try {
		const body = new URLSearchParams({
			grant_type: "client_credentials",
		});
		const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
			headers: {
				Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + SECRET_ID)}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		throw new Error("client credential token fetch 실패");
	}
};

// 로그인 후 /callback?code=... 로 받은 code 를 access token 으로 바꾼다. (PKCE 방식이라 시크릿 없이 code_verifier 를 보낸다)
export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
	// 있어야 하는 값이 undefined 일 수도 있어서 if 문으로 걸러준다.
	if (!CLIENT_ID || !REDIRECT_URI) {
		throw new Error("CLIENT_ID 또는 REDIRECT_URI 환경 변수가 없음");
	}
	try {
		const body = new URLSearchParams({
			client_id: CLIENT_ID,
			grant_type: "authorization_code",
			code,
			redirect_uri: REDIRECT_URI, // 로그인할 때 보낸 주소와 똑같아야 한다
			code_verifier: codeVerifier,
		});
		const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		throw new Error("access token 교환 실패", { cause: error });
	}
};

// access token 은 1시간이면 만료된다. 로그인 때 받은 refresh token 으로 새 access token 을 받는다.
// (PKCE 방식이라 시크릿 없이 client_id 만 보낸다)
export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
	if (!CLIENT_ID) {
		throw new Error("CLIENT_ID 환경 변수가 없음");
	}
	try {
		const body = new URLSearchParams({
			client_id: CLIENT_ID,
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		});
		const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		throw new Error("access token 재발급 실패", { cause: error });
	}
};
