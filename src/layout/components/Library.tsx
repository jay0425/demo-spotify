import React from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";
import LoadingSpinner from "../../common/components/ui/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";

const Library = () => {
	const { data, isLoading, error } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (error) {
		return <ErrorMessage errorMessage={error.message} />;
	}

	return (
		<>
			{
				// ! 기존에는 단순히 data 하나로 했었음. 아래와 같은 방식 참고
				!data || data.total === 0 ? <EmptyPlaylist /> : <Playlist playlists={data.items} />
			}
		</>
	);
};

export default Library;
