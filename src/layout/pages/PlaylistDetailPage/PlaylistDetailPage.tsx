import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import PlaylistHeader from "../../components/PlaylistHeader";
import LoadingSpinner from "../../../common/components/ui/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Playlist } from "../../../models/playlist";

// 플레이리스트 전체 길이(ms). 곡 목록이 전부 들어 있을 때만 구한다.
// 100곡이 넘어서 일부만 왔거나, 남의 플레이리스트라 곡 목록이 안 왔으면 일부만 더한 틀린 값이 되니까 null 을 돌려준다.
const getTotalDurationMs = (playlist: Playlist): number | null => {
	const total = playlist.items?.total ?? 0;
	const rows = playlist.items?.items ?? [];
	if (total === 0 || rows.length < total) return null;
	// 더 이상 들을 수 없는 곡은 item 이 null 이라 0 으로 더한다
	return rows.reduce((sum, row) => sum + (row.item?.duration_ms ?? 0), 0);
};

const PlaylistDetailPage = () => {
	const { id } = useParams<{ id: string }>(); // ! useState 쓸 때도 이렇게 제네릭으로 투명하게 보이게 정의해주면 좋다!
	// 훅은 return 보다 먼저 불러야 한다. (렌더링할 때마다 같은 순서로 불려야 해서 조건문 뒤에 두면 안 된다)
	// id 가 없으면 빈 문자열이 들어가서 useGetPlaylist 의 enabled 가 false 가 되고, 요청은 보내지 않는다.
	const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id ?? "" });
	const { data: user } = useGetCurrentUserProfile();

	if (id === undefined) return <Navigate to="/" />;
	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorMessage errorMessage={error.message} />;
	if (!playlist) return null;

	// 다른 사람 프로필을 가져오는 API(GET /users/{id})가 없어져서, 남의 프로필 사진은 알 수 없다.
	// 내 플레이리스트일 때만 내 프로필 사진을 쓰고, 아니면 사람 아이콘이 나온다.
	const isMine = !!user?.id && playlist.owner?.id === user.id;

	return (
		<div>
			<PlaylistHeader
				image={playlist.images?.[0]?.url || null} // 곡이 없으면 images 가 null 로 온다
				name={playlist.name || ""}
				ownerName={playlist.owner?.display_name || null}
				ownerImage={isMine ? user?.images?.[0]?.url || null : null}
				trackCount={playlist.items?.total ?? 0}
				totalDurationMs={getTotalDurationMs(playlist)}
				shareUrl={playlist.external_urls?.spotify || null}
			/>
		</div>
	);
};

export default PlaylistDetailPage;
