import { Box, styled, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";
import CookieIcon from "@mui/icons-material/Cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import MouseSparkles from "../common/components/ui/MouseSparkles";
import Navbar from "./components/Navbar";
import { Suspense, useState } from "react";
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

// 내 라이브러리 박스. 사이드바에서 위의 메뉴 박스를 빼고 남은 세로 공간을 전부 쓴다.
// Sidebar 는 height: 100% 라서 옆의 ContentBox 와 높이가 같다. 이 박스가 그 안에 딱 맞아야 사이드바도 넘치지 않는다.
const LibraryBox = styled(ContentBox)({
	flex: 1, // 남은 세로 공간을 다 차지한다
	// flex 아이템은 기본으로 내용보다 작아지지 않는다(min-height: auto). 그래서 플레이리스트가 많으면 박스가 늘어나서 사이드바 밖으로 넘친다.
	// 0 으로 하면 박스는 남은 공간 크기로 고정되고, 넘치는 부분은 안쪽 Playlist 가 스크롤로 보여준다.
	minHeight: 0,
	display: "flex",
	flexDirection: "column", // 헤드 아래에 오는 Playlist 가 남은 높이를 받을 수 있게 세로 flex 로 만든다
});

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
	// 마우스 반짝이 효과를 켤지. 토글은 Navbar 에 있고 효과는 여기서 그려서, 둘의 부모인 여기서 상태를 갖는다.
	// 새로고침해도 유지되게 localStorage 에 저장한다. (처음엔 켜진 상태)
	const [isSparklesOn, setIsSparklesOn] = useState(() => localStorage.getItem("mouse-sparkles") !== "off");

	const toggleSparkles = () => {
		const next = !isSparklesOn;
		setIsSparklesOn(next);
		localStorage.setItem("mouse-sparkles", next ? "on" : "off");
	};

	return (
		<Layout>
			{/* 끄면 컴포넌트가 사라지면서 MouseSparkles 가 마우스 이벤트를 알아서 정리한다 */}
			{isSparklesOn && <MouseSparkles />}
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
				<LibraryBox>
					<LibraryHead />
					<Library />
				</LibraryBox>
			</Sidebar>
			<ContentBox>
				<Navbar isSparklesOn={isSparklesOn} onToggleSparkles={toggleSparkles} />
				<Suspense fallback={<LoadingSpinner />}>
					{/* 자식들이 Outlet로 마치 컴포넌트 처럼 들어오게 된다. */}
					<Outlet />
				</Suspense>
			</ContentBox>
		</Layout>
	);
};

export default AppLayout;
