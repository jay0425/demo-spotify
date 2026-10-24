import { IconButton, styled, Typography } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddIcon from "@mui/icons-material/Add";

const LibraryHeader = styled("div")({
	display: "flex",
	alignItems: "center",
	padding: 0,
	paddingLeft: "14px",
	margin: 0,
	gap: "20px",
});

const InnerHeader = styled("div")(({ theme }) => ({
	textDecoration: "none",
	display: "flex",
	alignItems: "center",
	gap: "15px",
	cursor: "pointer",
	color: theme.palette.text.secondary,
	"&:hover": {
		color: theme.palette.text.primary,
	},
	"&.active": {
		color: theme.palette.text.primary,
	},
}));

const LibraryHead = () => {
	return (
		<LibraryHeader>
			<CreateNewFolderIcon />
			<Typography variant="h2" sx={{ fontWeight: 700, flexShrink: 0 }}>
				내 라이브러리
			</Typography>
			{/* IconButton : 아이콘만 들어가는 버튼. 기본으로 동그랗게 나온다. */}
			<IconButton aria-label="플레이리스트 추가" sx={{ color: "text.secondary" }}>
				<AddIcon />
			</IconButton>
		</LibraryHeader>
	);
};

export default LibraryHead;
