import { useState } from "react";
import { Avatar, IconButton, Snackbar, styled, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";

export interface PlaylistHeaderProps {
	/** 대표 이미지 주소. 없거나 못 불러오면 음표 아이콘이 나온다 */
	image: string | null;
	/** 플레이리스트 이름 */
	name: string;
	/** 만든 사람 이름 */
	ownerName: string | null;
	/** 만든 사람 프로필 사진 주소. 없으면 사람 아이콘이 나온다 */
	ownerImage: string | null;
	/** 곡 수. 0 이면 곡 수와 전체 길이를 표시하지 않는다 */
	trackCount: number;
	/** 전체 길이(ms). 모를 때는 null 이고, 곡 수만 나온다 */
	totalDurationMs: number | null;
	/** + 버튼을 누르면 클립보드에 복사할 플레이리스트 링크. 없으면 버튼이 안 나온다 */
	shareUrl: string | null;
}

// 이미지가 없을 때와 이미지가 있을 때 둘 다 같은 크기로 쓴다.
// cqi 는 HeaderContainer 가로 길이의 1% 다. 헤더 너비에 맞춰 커지고 줄어들되, 128px ~ 232px 사이로 둔다.
const COVER_SIZE = "clamp(128px, 24cqi, 232px)";

// containerType : 이 박스를 "컨테이너"로 만들어서, 안쪽에서 cqi 단위를 이 박스 가로 길이 기준으로 쓸 수 있게 한다.
// vw 는 화면 전체 너비 기준이라 사이드바 너비까지 들어가서, 헤더가 실제로 얼마나 넓은지와 어긋난다.
// 주의 : 컨테이너 안에서는 position: fixed 도 화면이 아니라 이 박스 기준으로 뜬다. 그래서 Snackbar 는 이 박스 바깥에 둔다.
const HeaderContainer = styled("div")(({ theme }) => ({
	containerType: "inline-size",
	display: "flex",
	alignItems: "flex-end", // 글자들을 이미지 아래쪽 끝에 맞춘다
	gap: "24px",
	padding: "24px",
	borderRadius: "8px",
	// 위에서 아래로 갈수록 투명해져서 바깥 배경(ContentBox)과 자연스럽게 이어진다
	background: `linear-gradient(${theme.palette.action.hover}, transparent)`,
	// 좁은 화면에서는 이미지 아래로 글자를 내린다
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		alignItems: "flex-start",
		gap: "16px",
		padding: "16px",
	},
}));

const CoverImage = styled(Avatar)(({ theme }) => ({
	width: COVER_SIZE,
	height: COVER_SIZE,
	flexShrink: 0, // 이름이 길어도 이미지가 찌그러지지 않는다
	boxShadow: `0 4px 60px ${theme.alpha(theme.palette.text.primary, 0.3)}`,
	// 이미지가 없거나 못 불러왔을 때 보이는 음표 아이콘의 배경/색 (PlaylistItem 과 같다)
	backgroundColor: theme.palette.action.active,
	color: theme.palette.text.secondary,
	[theme.breakpoints.down("sm")]: {
		width: "min(232px, 60cqi)",
		height: "min(232px, 60cqi)",
	},
}));

// 가로가 줄어들 수 있게 minWidth 를 0 으로 한다. (flex 아이템은 기본으로 내용보다 작아지지 않아서, 긴 이름이 옆으로 삐져나간다)
const InfoBox = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	minWidth: 0,
});

const Title = styled(Typography)({
	fontSize: "clamp(2rem, 8cqi, 4.5rem)", // 헤더 너비에 맞춰 32px ~ 72px
	fontWeight: 800,
	lineHeight: 1.2,
	letterSpacing: "-0.04em",
	overflowWrap: "anywhere", // 띄어쓰기 없는 긴 이름도 중간에서 줄을 바꾼다
	// 이름이 아주 길면 3줄까지만 보여주고 ... 으로 자른다
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 3,
	overflow: "hidden",
});

const MetaRow = styled("div")({
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap", // 좁으면 다음 줄로 넘긴다
	gap: "8px",
});

// 호버 배경은 MUI 가 --IconButton-hoverBg 변수로 칠한다. (LibraryHead 주석 참고)
const CopyLinkButton = styled(IconButton)(({ theme }) => ({
	width: "32px",
	height: "32px",
	color: theme.palette.text.primary,
	backgroundColor: theme.alpha(theme.palette.text.primary, 0.08),
	"--IconButton-hoverBg": theme.alpha(theme.palette.text.primary, 0.16),
}));

const OwnerAvatar = styled(Avatar)(({ theme }) => ({
	width: "24px",
	height: "24px",
	backgroundColor: theme.palette.primary.main,
}));

// 전체 길이를 스포티파이처럼 보여준다. 1시간 미만이면 "12분 6초", 1시간 이상이면 "약 2시간 5분"
const formatTotalDuration = (ms: number) => {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) return minutes > 0 ? `약 ${hours}시간 ${minutes}분` : `약 ${hours}시간`;
	if (minutes > 0) return seconds > 0 ? `${minutes}분 ${seconds}초` : `${minutes}분`;
	return `${seconds}초`;
};

const PlaylistHeader = ({
	image,
	name,
	ownerName,
	ownerImage,
	trackCount,
	totalDurationMs,
	shareUrl,
}: PlaylistHeaderProps) => {
	// 복사 결과를 화면 아래에 잠깐 띄운다.
	// open 과 message 를 따로 두는 이유 : 닫힐 때 message 까지 지우면, 사라지는 애니메이션 동안 글자가 먼저 없어진다.
	const [toast, setToast] = useState({ open: false, message: "" });

	const handleCopyLink = async () => {
		if (!shareUrl) return;
		// 브라우저가 클립보드 쓰기를 막으면(권한 거부, https 가 아닌 주소 등) 에러가 나서 실패 안내를 띄운다
		try {
			await navigator.clipboard.writeText(shareUrl);
			setToast({ open: true, message: "클립보드에 링크를 복사했어요." });
		} catch {
			setToast({ open: true, message: "링크를 복사하지 못했어요. 다시 시도해 주세요." });
		}
	};

	return (
		<>
			<HeaderContainer>
				{/* 사진이 없거나 못 불러오면 안쪽(children)의 음표 아이콘이 가운데에 대신 보인다 */}
				<CoverImage variant="rounded" src={image ?? undefined} alt={name}>
					<MusicNoteIcon sx={{ width: "40%", height: "40%" }} />
				</CoverImage>
				<InfoBox>
					<Title variant="h1">{name}</Title>
					<MetaRow>
						{shareUrl && (
							<Tooltip title="링크 복사">
								<CopyLinkButton aria-label="플레이리스트 링크 복사" onClick={handleCopyLink}>
									<AddIcon fontSize="small" />
								</CopyLinkButton>
							</Tooltip>
						)}
						{/* 바로 옆에 이름이 나오니까 alt 는 비워서 스크린 리더가 이름을 두 번 읽지 않게 한다 */}
						<OwnerAvatar src={ownerImage ?? undefined} alt="">
							<PersonIcon fontSize="small" />
						</OwnerAvatar>
						{ownerName && (
							<Typography variant="body1" sx={{ fontWeight: 700 }}>
								{ownerName}
							</Typography>
						)}
						{/* 곡이 없는 플레이리스트는 곡 수와 길이를 아예 안 보여준다 */}
						{trackCount > 0 && (
							<Typography variant="body1" color="text.secondary">
								• {trackCount.toLocaleString("ko-KR")}곡
								{totalDurationMs ? `, ${formatTotalDuration(totalDurationMs)}` : ""}
							</Typography>
						)}
					</MetaRow>
				</InfoBox>
			</HeaderContainer>
			<Snackbar
				open={toast.open}
				message={toast.message}
				autoHideDuration={3000}
				onClose={() => setToast((prev) => ({ ...prev, open: false }))}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			/>
		</>
	);
};

export default PlaylistHeader;
