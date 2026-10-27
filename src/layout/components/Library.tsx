import { styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";
import LoadingSpinner from "../../common/components/ui/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// LoadingSpinner 는 position: relative 가 있는 가장 가까운 조상을 꽉 채우고 그 가운데에 뜬다 (position: absolute; inset: 0).
// 이 박스가 없으면 바깥의 사이드바 박스(헤드 + 라이브러리)가 기준이 돼서, 낮은 박스 가운데에 뜨느라 헤드 위로 삐져나온다.
// 그래서 헤드 아래에 스피너가 들어갈 높이의 기준 박스를 따로 만든다.
const LoadingBox = styled("div")({
	position: "relative",
	height: "160px",
});

const Library = () => {
	const { ref, inView } = useInView();

	const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useGetCurrentUserPlaylists({ limit: 10 });
	const { data: user } = useGetCurrentUserProfile();

	// 목록 맨 아래(ref 를 단 div)가 보이면 다음 페이지를 불러온다.
	// Playlist 는 불러오는 동안 이 div 를 뺐다가 끝나면 다시 넣는다. 그래서 inView 는 불러올 때마다 false 가 됐다가,
	// 다시 넣은 div 가 정말 보일 때만(불러온 10개로 화면이 다 안 찼을 때) true 로 바뀌어서 이어서 불러온다. (Playlist 의 BottomSentinel 주석 참고)
	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (!user) return <EmptyPlaylist />;

	if (isLoading) {
		return (
			<LoadingBox>
				<LoadingSpinner />
			</LoadingBox>
		);
	}
	if (error) {
		return <ErrorMessage errorMessage={error.message} />;
	}

	return (
		<>
			{
				// ! 기존에는 단순히 data 하나로 했었음. 아래와 같은 방식 참고
				// total 은 어느 페이지에나 전체 개수로 똑같이 들어 있다. 불러온 페이지들의 items 는 하나로 이어 붙여서 넘긴다
				!data || data.pages[0].total === 0 ? (
					<EmptyPlaylist />
				) : (
					<Playlist
						ref={ref}
						isFetching={isFetchingNextPage}
						playlists={data.pages.flatMap((page) => page.items)}
					/>
				)
			}
		</>
	);
};

export default Library;
