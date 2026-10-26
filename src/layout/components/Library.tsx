import React from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";

const Library = () => {
	const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

	// 로그인했어도 플레이리스트가 하나도 없으면(items 가 빈 배열) 만들기 안내를 보여준다
	return (
		<>
			{
				// ! 기존에는 단순히 data 하나로 했었음. 아래와 같은 방식 참고
				!data || data.total === 0 ? <EmptyPlaylist /> : <Playlist data={data} />
			}
		</>
	);
};

export default Library;
