import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	listItemButtonClasses,
	ListItemText,
	styled,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useMatch, useNavigate } from "react-router";
import { SimplifiedPlaylist } from "../../models/playlist";

interface PlaylistProps {
	/** 내 플레이리스트 목록 (GET /me/playlists 응답의 items) */
	playlists: SimplifiedPlaylist[];
}

// 이미지 위 재생 아이콘을 감싸는 div 의 클래스. 줄에 마우스를 올렸을 때 이 클래스를 찾아서 보이게 한다.
const PLAY_OVERLAY_CLASS = "playlist-play-overlay";

// ListItemButton 은 호버하면 테마의 action.hover 색(#ecdccb)으로 배경을 알아서 칠해준다.
const PlaylistItemButton = styled(ListItemButton)({
	gap: "12px",
	padding: "8px",
	borderRadius: "8px",
	// 마우스를 올리거나, 키보드(Tab)로 포커스하면 재생 아이콘이 나타난다.
	// Mui-focusVisible : 마우스 클릭이 아니라 키보드로 포커스했을 때만 MUI 가 붙여주는 클래스
	[`&:hover .${PLAY_OVERLAY_CLASS}, &.${listItemButtonClasses.focusVisible} .${PLAY_OVERLAY_CLASS}`]:
		{
			opacity: 1,
		},
});

// 재생 아이콘을 이미지 위에 띄우려고 기준점(position: relative)을 만든다.
// ListItemAvatar 는 기본 최소 너비가 56px 이라, 간격은 gap 으로만 주려고 0 으로 바꾼다.
const ImageBox = styled(ListItemAvatar)({
	position: "relative",
	minWidth: 0,
});

const PlaylistImage = styled(Avatar)(({ theme }) => ({
	width: "48px",
	height: "48px",
	// 이미지가 없거나 못 불러왔을 때 보이는 음표 아이콘의 배경/색
	backgroundColor: theme.palette.action.active,
	color: theme.palette.text.secondary,
}));

// 이미지를 진한 갈색으로 반쯤 덮고 가운데에 재생 아이콘을 둔다. 평소엔 투명해서 안 보인다.
const PlayOverlay = styled("div")(({ theme }) => ({
	position: "absolute",
	inset: 0, // top/right/bottom/left 를 전부 0 으로. 이미지 크기에 딱 맞게 덮는다
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: theme.shape.borderRadius, // Avatar(variant="rounded") 와 같은 모서리
	backgroundColor: theme.alpha(theme.palette.text.primary, 0.5), // #3e2a1e 를 50% 투명하게
	color: theme.palette.primary.contrastText, // 아이콘 색 (크림색)
	opacity: 0,
	transition: "opacity 0.2s",
}));

const Playlist = ({ playlists }: PlaylistProps) => {
	const navigate = useNavigate();
	// 지금 보고 있는 플레이리스트의 id. 주소가 /playlist/:id 가 아니면 undefined.
	// 클릭한 id 를 state 로 따로 들고 있지 않고 주소에서 읽어서, 새로고침하거나 뒤로가기 해도 선택 표시가 주소와 맞는다.
	const selectedId = useMatch("/playlist/:id")?.params.id;

	return (
		<List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }} disablePadding>
			{playlists.map((playlist, index) => {
				const ownerName = playlist.owner?.display_name;
				const isSelected = !!playlist.id && playlist.id === selectedId;
				return (
					// id 가 없는 경우는 거의 없지만 타입상 optional 이라 index 로 대신한다
					<ListItem key={playlist.id ?? index} disablePadding>
						{/* selected : MUI 가 테마의 primary 색을 옅게 깔아서 선택된 줄을 표시해준다 */}
						<PlaylistItemButton
							selected={isSelected}
							aria-current={isSelected ? "page" : undefined} // 스크린 리더에 "현재 페이지" 라고 알려준다
							// id 가 없으면 /playlist/ (목록 페이지) 로 잘못 가니까 이동하지 않는다
							onClick={() => playlist.id && navigate(`/playlist/${playlist.id}`)}>
							<ImageBox>
								{/* images 는 큰 사진부터 오고, 비어 있을 수도 있다. 사진이 없거나 못 불러오면 안쪽(children)의 음표 아이콘이 대신 보인다 */}
								<PlaylistImage
									variant="rounded"
									src={playlist.images?.[0]?.url}
									alt={playlist.name}>
									<MusicNoteIcon />
								</PlaylistImage>
								<PlayOverlay className={PLAY_OVERLAY_CLASS}>
									<PlayArrowIcon fontSize="large" />
								</PlayOverlay>
							</ImageBox>
							{/* noWrap : 글자가 길면 한 줄에서 ... 으로 자른다 */}
							<ListItemText
								primary={playlist.name}
								secondary={ownerName ? `플레이리스트 • ${ownerName}` : "플레이리스트"}
								slotProps={{
									primary: { noWrap: true, sx: { fontSize: "1rem" } },
									secondary: { noWrap: true },
								}}
							/>
						</PlaylistItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};

export default Playlist;
