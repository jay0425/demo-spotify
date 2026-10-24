import axios from "axios";
import { User } from "../models/user";
import api from "../utils/api";

// 로그인한 사용자의 프로필. client credential 토큰이 아니라 로그인해서 받은 access token 이 필요하다.
export const getCurrentUserProfile = async (): Promise<User> => {
	// 토큰은 api(utils/api.ts) 의 interceptor 가 요청할 때마다 넣어준다.
	try {
		const response = await api.get("/me");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		// cause 에 원래 에러를 담아두면, 쓰는 쪽에서 상태 코드(401, 403 등)를 확인할 수 있다.
		throw new Error("current user profile fetch 실패", { cause: error });
	}
};
