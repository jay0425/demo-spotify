import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from "../models/playlist";

const useGetCurrentUserPlaylists = (
	params: GetCurrentUserPlaylistRequest = {},
): UseQueryResult<GetCurrentUserPlaylistResponse, Error> => {
	const accessToken = localStorage.getItem("access_token");
	return useQuery({
		queryKey: ["current-user-playlists", params], // limit, offset 이 바뀌면 다시 요청한다
		queryFn: () => getCurrentUserPlaylists(params),
		// 로그인 토큰이 있어야 하는 API 라서, 로그인 전에는 요청하지 않는다.
		enabled: !!accessToken,
	});
};

export default useGetCurrentUserPlaylists;
