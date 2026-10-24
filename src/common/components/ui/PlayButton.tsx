import { styled } from "@mui/material";
import React from "react";

const PlayButtonContainer = styled("button")(({ theme }) => ({
	backgroundColor: theme.palette.text.primary, // #3e2a1e 진한 갈색
	color: theme.palette.background.paper, // 아이콘 색. svg path 의 fill="currentColor" 가 이 색을 따라간다
	border: "none",
	borderRadius: "50%",
	width: "50px",
	height: "50px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	boxShadow: "rgba(0, 0, 0, 0.3) 0px 8px 8px 0px",
	"&:focus": {
		outline: "none",
	},
}));

interface PlayButtonProps {
	/** 재생 버튼을 눌렀을 때 실행할 함수 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
	return (
		<PlayButtonContainer type="button" aria-label="재생" onClick={onClick}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M8 5v14l11-7z" fill="currentColor" />
			</svg>
		</PlayButtonContainer>
	);
};

export default PlayButton;
