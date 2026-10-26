import React from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";

const Library = () => {
	const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

	// 로그인했어도 플레이리스트가 하나도 없으면(items 가 빈 배열) 만들기 안내를 보여준다
	return <>{data?.items.length ? <Playlist data={data} /> : <EmptyPlaylist />}</>;
};

export default Library;
