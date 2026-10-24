import { Box } from "@mui/material";
import LoginButton from "../../common/components/ui/LoginButton";

const Navbar = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "start",
				height: "64px",
			}}>
			<LoginButton />
		</Box>
	);
};

export default Navbar;
