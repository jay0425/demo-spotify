import { Box, Button, styled, Typography } from "@mui/material";

const LibraryContentBox = styled(Box)(({ theme }) => ({
	borderRadius: "8px",
	backgroundColor: theme.palette.background.elevated,
	color: theme.palette.text.primary,
	width: "100%",
	padding: "18px",
	marginTop: "15px",
	marginBottom: "8px",
	marginRight: "8px",
}));

const LibraryButton = styled(Button)({
	marginTop: "20px",
	fontWeight: 700,
});

const EmptyPlaylist = () => {
	return (
		<LibraryContentBox>
			<div>
				<Typography variant="h2" sx={{ fontWeight: 700 }}>
					Create your first playlist
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 400 }}>
					It's easy, we'll help you
				</Typography>
			</div>
			<LibraryButton variant="contained" color="primary" disableElevation>
				Create playlist
			</LibraryButton>
		</LibraryContentBox>
	);
};

export default EmptyPlaylist;
