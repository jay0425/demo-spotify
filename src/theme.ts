import { createTheme } from "@mui/material";

// 웹사이트 테마 만들기

const theme = createTheme({
	palette: {
		// 색깔 정하기.
		mode: "light",
		primary: {
			main: "#8b5e3c", // 갈색
			contrastText: "#fffaf5",
		},
		secondary: {
			main: "#f4c7c3", // 연한 핑크
			contrastText: "#4a3326",
		},
		background: {
			default: "#f5ede3", // 베이지
			paper: "#fbf6f0",
		},
		text: {
			primary: "#3e2a1e",
			secondary: "#7a6152",
		},
		action: {
			hover: "#ecdccb",
			active: "#e3cdb8",
		},
	},
	typography: {
		// 글씨 크기
		fontFamily: "Roboto, Arial, sans-serif",
		h1: {
			fontWeight: 700,
			fontSize: "24px",
		},
		h2: {
			fontSize: "1rem",
		},
		body1: {
			fontSize: "14px",
		},
		subtitle1: {
			fontSize: "0.6875rem",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "30px",
					textTransform: "none",
					variants: [
						{
							props: { variant: "contained", color: "secondary" },
							style: {
								backgroundColor: "#f4c7c3",
								color: "#4a3326",
								"&:hover": {
									backgroundColor: "#eeb2ac",
								},
							},
						},
					],
				},
				sizeLarge: {
					padding: "8px 32px",
					fontWeight: 700,
					fontSize: "16px",
				},
			},
		},
	},
});

export default theme;
