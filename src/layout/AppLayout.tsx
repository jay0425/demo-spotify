import { Box, styled, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";
import CookieIcon from "@mui/icons-material/Cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import MouseSparkles from "../common/components/ui/MouseSparkles";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import LoadingSpinner from "../common/components/ui/LoadingSpinner";

const Layout = styled("div")({
	// 기본적으로 div 성격의 태그다.
	display: "flex",
	height: "100vh",
	padding: "8px",
	gap: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
	width: "331px",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	[theme.breakpoints.down("sm")]: {
		display: "none",
	},
	gap: "8px",
}));

const ContentBox = styled(Box)(({ theme }) => ({
	borderRadius: "8px",
	backgroundColor: theme.palette.background.paper,
	color: theme.palette.text.primary,
	width: "100%",
	position: "relative", // 안쪽 로딩 스피너(position: absolute)가 이 박스를 기준으로 가운데에 뜨게 한다
	paddingBlock: "10px",
	paddingInline: "20px",
}));

const NavList = styled("ul")({
	listStyle: "none",
	padding: 0,
	margin: 0,
	display: "flex",
	flexDirection: "column",
	gap: "15px",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
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

const AppLayout = () => {
	return (
		<Layout>
			<MouseSparkles />
			<Sidebar>
				<ContentBox>
					<NavList>
						<StyledNavLink to="/" end>
							<CookieIcon />
							<Typography variant="h2" sx={{ fontWeight: 700 }}>
								홈
							</Typography>
						</StyledNavLink>
						<StyledNavLink to="/search">
							<VisibilityIcon />
							<Typography variant="h2" sx={{ fontWeight: 700 }}>
								검색하기
							</Typography>
						</StyledNavLink>
					</NavList>
				</ContentBox>
				<ContentBox>
					<LibraryHead />
					<Library />
				</ContentBox>
			</Sidebar>
			<ContentBox>
				<Navbar />
				<Suspense fallback={<LoadingSpinner />}>
					{/* 자식들이 Outlet로 마치 컴포넌트 처럼 들어오게 된다. */}
					<Outlet />
				</Suspense>
			</ContentBox>
		</Layout>
	);
};

export default AppLayout;
