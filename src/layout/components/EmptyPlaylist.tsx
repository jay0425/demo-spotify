import { Box, styled, Typography } from "@mui/material";
import Button from "../../common/components/ui/Button";

const LibraryContentBox = styled(Box)(({ theme }) => ({
	borderRadius: "8px",
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	width: "100%",
	padding: "18px",
	// marginTop: "15px",
	// marginBottom: "8px",
	// marginRight: "8px",
}));

const LibraryButton = styled(Button)({
	marginTop: "10px",
});

const EmptyPlaylist = () => {
	return (
		<LibraryContentBox>
			<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				<Typography variant="h2" sx={{ fontWeight: 700 }}>
					첫번째 플레이 리스트를 만들어 보세요!
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 400 }}>
					내 취향 가득 담아...
				</Typography>
			</div>
			<LibraryButton>플레이 리스트 만들기</LibraryButton>
		</LibraryContentBox>
	);
};

export default EmptyPlaylist;
