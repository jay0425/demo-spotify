import { styled, Typography } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const LibraryHeader = styled("div")({
	display: "flex",
	alignItems: "center",
	padding: 0,
	paddingLeft: "18px",
	margin: 0,
	gap: "20px",
});

const InnerHeader = styled("div")(({ theme }) => ({
	textDecoration: "none",
	display: "flex",
	alignItems: "center",
	gap: "20px",
	cursor: "pointer",
	color: theme.palette.text.secondary,
	"&:hover": {
		color: theme.palette.text.primary,
	},
	"&.active": {
		color: theme.palette.text.primary,
	},
}));

// const StyledNavLink = styled(NavLink)(({ theme }) => ({
// 	textDecoration: "none",
// 	display: "flex",
// 	alignItems: "center",
// 	gap: "20px",
// 	cursor: "pointer",
// 	color: theme.palette.text.secondary,
// 	"&:hover": {
// 		color: theme.palette.text.primary,
// 	},
// 	"&.active": {
// 		color: theme.palette.text.primary,
// 	},
// }));

const LibraryHead = () => {
	return (
		<LibraryHeader>
			{/* <InnerHeader> */}
			<CreateNewFolderIcon />
			<Typography variant="h2" sx={{ fontWeight: 700 }}>
				My Library
			</Typography>
			{/* </InnerHeader> */}
		</LibraryHeader>
	);
};

export default LibraryHead;
