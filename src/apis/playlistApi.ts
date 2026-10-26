import axios from "axios";
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from "../models/playlist";
import api from "../utils/api";

// 로그인한 사용자가 만들었거나 팔로우한 플레이리스트 목록. playlist-read-private 권한이 필요하다.
export const getCurrentUserPlaylists = async ({
	limit,
	offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
	// 토큰은 api(utils/api.ts) 의 interceptor 가 요청할 때마다 넣어준다.
	try {
		const response = await api.get("/me/playlists", { params: { limit, offset } });
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		// cause 에 원래 에러를 담아두면, 쓰는 쪽에서 상태 코드(401, 403 등)를 확인할 수 있다.
		throw new Error("current user playlists fetch 실패", { cause: error });
	}
};
