import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { User } from "../models/user";

// 로그인한 사용자의 프로필. client credential 토큰이 아니라 로그인해서 받은 access token 이 필요하다.
export const getCurrentUserProfile = async (): Promise<User> => {
	// localStorage 는 값이 바뀌어도 리액트가 알지 못해서, 렌더링할 때가 아니라 요청할 때마다 읽는다.
	const accessToken = localStorage.getItem("access_token");
	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}/me`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		// cause 에 원래 에러를 담아두면, 쓰는 쪽에서 상태 코드(401, 403 등)를 확인할 수 있다.
		throw new Error("current user profile fetch 실패", { cause: error });
	}
};
