import { List, styled } from "@mui/material";
import { useMatch, useNavigate } from "react-router";
import { SimplifiedPlaylist } from "../../models/playlist";
import LoadingSpinner from "../../common/components/ui/LoadingSpinner";
import PlaylistItem from "../../common/components/PlaylistItem";

interface PlaylistProps {
	ref: React.Ref<HTMLDivElement>;
	isFetching: boolean;
	/** 내 플레이리스트 목록 (GET /me/playlists 응답의 items) */
	playlists: SimplifiedPlaylist[];
}

const PlaylistList = styled(List)({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
	flex: 1, // 헤드 아래 남은 높이를 다 차지한다
	minHeight: 0, // 이게 없으면 목록이 내용만큼 늘어나서 스크롤이 안 생긴다 (LibraryBox 주석 참고)
	overflowY: "auto", // 넘치면 세로 스크롤
	// 스크롤은 되지만 스크롤바는 안 보이게 한다. (마우스 휠, 트랙패드, 터치로 스크롤된다)
	scrollbarWidth: "none", // Firefox, 최신 Chrome/Edge/Safari
	"&::-webkit-scrollbar": {
		display: "none", // 예전 Chrome/Safari
	},
});

// 다음 페이지를 불러오는 동안 목록 맨 아래에 스피너가 들어갈 자리.
// LoadingSpinner 는 position: relative 인 가장 가까운 조상을 채우는데, MUI List 도 relative 라서
// 이 박스가 없으면 스크롤 영역의 맨 위(처음 보이던 자리)에 떠서, 맨 아래까지 스크롤한 상태에서는 안 보인다.
const NextPageLoadingBox = styled("div")({
	position: "relative",
	height: "120px",
	// 목록(PlaylistList)이 세로 flex 라서, 줄이 많아 넘치면 flex 아이템이 줄어든다(flex-shrink: 1).
	// 이 박스 안의 스피너는 position: absolute 라 박스 크기에 안 쳐줘서, 박스가 0px 까지 줄어들고 막대는 안 보이고 글자만 남는다.
	// 0 으로 하면 넘쳐도 120px 그대로 있다.
	flexShrink: 0,
});

// 목록 맨 아래에 닿았는지 확인하는 표시. 스크롤 영역 안에 보이면 Library 가 다음 페이지를 불러온다.
// 높이가 0 이면 줄 높이의 소수점 픽셀 오차 때문에 끝까지 스크롤해도 0.몇 px 모자라서 "안 보인다" 로 판단될 수 있어서 1px 을 준다.
// 다음 페이지를 불러오는 동안에는 이 표시를 뺀다. 계속 두면 새 페이지가 붙어서 표시가 화면 밖으로 밀려나도
// IntersectionObserver 는 다음 프레임에야 "안 보인다" 고 알려줘서, 그 사이 Library 의 effect 가 예전 값(inView: true)을 보고 한 페이지를 더 불러온다.
// 뺐다가 다시 넣으면 useInView 가 inView 를 false 로 되돌리고, 다시 넣은 표시가 정말 보일 때만 true 로 바뀐다.
const BottomSentinel = styled("div")({
	minHeight: "1px",
});

const Playlist = ({ ref, isFetching, playlists }: PlaylistProps) => {
	const navigate = useNavigate();
	// 지금 보고 있는 플레이리스트의 id. 주소가 /playlist/:id 가 아니면 undefined.
	// 클릭한 id 를 state 로 따로 들고 있지 않고 주소에서 읽어서, 새로고침하거나 뒤로가기 해도 선택 표시가 주소와 맞는다.
	const selectedId = useMatch("/playlist/:id")?.params.id;

	return (
		<PlaylistList disablePadding>
			{playlists.map((playlist, index) => (
				// id 가 없는 경우는 거의 없지만 타입상 optional 이라 index 로 대신한다
				<PlaylistItem
					key={playlist.id ?? index}
					image={playlist.images?.[0]?.url} // images 는 큰 사진부터 오고, 비어 있을 수도 있다
					name={playlist.name}
					ownerName={playlist.owner?.display_name}
					selected={!!playlist.id && playlist.id === selectedId}
					// id 가 없으면 /playlist/ (목록 페이지) 로 잘못 가니까 이동하지 않는다
					onClick={() => playlist.id && navigate(`/playlist/${playlist.id}`)}
				/>
			))}
			{/* 불러오는 중에는 표시 대신 스피너만 둔다 (BottomSentinel 주석 참고) */}
			{isFetching ? (
				<NextPageLoadingBox>
					<LoadingSpinner />
				</NextPageLoadingBox>
			) : (
				<BottomSentinel ref={ref} />
			)}
		</PlaylistList>
	);
};

export default Playlist;
