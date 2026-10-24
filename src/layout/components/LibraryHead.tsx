import { IconButton, styled, Typography } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddIcon from "@mui/icons-material/Add";

const LibraryHeader = styled("div")({
	display: "flex",
	alignItems: "center",
	padding: 0,
	// paddingLeft: "14px",
	margin: 0,
	gap: "20px",
});

const LibraryHead = () => {
	return (
		<LibraryHeader>
			<CreateNewFolderIcon />
			<Typography variant="h2" sx={{ fontWeight: 700, flexShrink: 0 }}>
				내 라이브러리
			</Typography>
			{/* IconButton : 아이콘만 들어가는 버튼. 기본으로 동그랗게 나온다. */}
			{/* 호버 배경은 MUI 가 --IconButton-hoverBg 변수로 칠한다. 기본은 거의 투명이라 테마의 hover 색으로 바꾼다. */}
			<IconButton
				aria-label="플레이리스트 추가"
				sx={(theme) => ({
					color: "text.secondary",
					"--IconButton-hoverBg": theme.palette.action.hover,
				})}>
				<AddIcon />
			</IconButton>
		</LibraryHeader>
	);
};

export default LibraryHead;
