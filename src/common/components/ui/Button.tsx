import { Button as MuiButton, styled } from "@mui/material";
import React from "react";

export interface ButtonProps {
	/** 버튼 안에 들어갈 글자 */
	children: React.ReactNode;
	/** 버튼 색상 */
	color?: "primary" | "secondary";
	/** 버튼 크기 */
	size?: "small" | "medium" | "large";
	/** 버튼 모양 (채움 / 테두리 / 글자만) */
	variant?: "contained" | "outlined" | "text";
	/** 비활성화 여부 */
	disabled?: boolean;
	/** 버튼을 눌렀을 때 실행할 함수 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/** styled() 로 감싸서 스타일을 더할 때 쓰는 클래스 */
	className?: string;
}

const StyledButton = styled(MuiButton)({
	fontWeight: 700,
});

const Button = ({
	children,
	color = "primary",
	size = "medium",
	variant = "contained",
	disabled = false,
	onClick,
	className,
}: ButtonProps) => {
	return (
		<StyledButton
			color={color}
			size={size}
			variant={variant}
			disabled={disabled}
			onClick={onClick}
			className={className}
			disableElevation>
			{children}
		</StyledButton>
	);
};

export default Button;
