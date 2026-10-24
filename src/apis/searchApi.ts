import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { SearchRequest, SearchResponse } from "../models/search";

export const searchItems = async (
	token: string,
	params: SearchRequest,
): Promise<SearchResponse> => {
	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}/search`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			// axios 는 배열을 type[]=album 으로 보내서, 스포티파이가 받는 type=album,track 모양으로 직접 합친다.
			params: { ...params, type: params.type.join(",") },
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		// cause 에 원래 에러를 담아두면, 쓰는 쪽에서 상태 코드(403 등)를 확인할 수 있다.
		throw new Error("search fetch 실패", { cause: error });
	}
};
