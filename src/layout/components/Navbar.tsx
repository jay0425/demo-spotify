import { useState } from "react";
import {
	Avatar,
	Box,
	FormControlLabel,
	IconButton,
	Menu,
	MenuItem,
	Switch,
	Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginButton from "../../common/components/ui/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useLogout from "../../hooks/useLogout";
import StarIcon from "@mui/icons-material/Star";

interface NavbarProps {
	/** 마우스 반짝이 효과가 켜져 있는지 */
	isSparklesOn: boolean;
	/** 반짝이 효과 켜기/끄기 */
	onToggleSparkles: () => void;
}

const Navbar = ({ isSparklesOn, onToggleSparkles }: NavbarProps) => {
	const { data: userProfile } = useGetCurrentUserProfile();
	const logout = useLogout();
	// 메뉴를 어디 아래에 띄울지 기준이 되는 요소(프로필 버튼). null 이면 메뉴가 닫힌 상태.
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

	const handleLogout = () => {
		logout();
		setMenuAnchor(null); // 메뉴를 닫으면서 다시 그려져서, 프로필 대신 로그인 버튼이 보인다
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
				paddingBlock: "10px",
			}}>
			{/* 로그인 여부와 상관없이 항상 맨 왼쪽(로그인 버튼 / 프로필 왼쪽)에 보인다 */}
			<FormControlLabel
				control={
					<Switch
						checked={isSparklesOn}
						onChange={onToggleSparkles}
						size="small"
						// icon={<StarIcon sx={{ fontSize: 30, transform: "translateY(-5px)" }} />}
						// checkedIcon={<StarIcon sx={{ fontSize: 30, transform: "translateY(-7px)" }} />}
					/>
				}
				label="반짝이"
				sx={{
					marginRight: "12px",
					"& .MuiFormControlLabel-label": {
						display: "none",
					},
				}}
			/>
			{userProfile ? (
				<>
					어서 오세요,
					<Typography sx={{ fontWeight: "bold", mx: 0.5 }}>{userProfile.display_name}</Typography>님
					{/* 클릭할 수 있게 IconButton 으로 감싼다. (키보드 Tab/Enter 로도 열린다) */}
					<IconButton
						aria-label="프로필 메뉴"
						onClick={(event) => setMenuAnchor(event.currentTarget)}
						size="small"
						sx={{ marginLeft: "8px" }}>
						{/* Avatar : 동그란 프로필 사진. images 는 배열이라 첫 번째(가장 큰) 이미지를 쓴다.
						    사진이 없거나 못 불러오면 안쪽(children)의 사람 아이콘이 대신 보인다. */}
						<Avatar
							src={userProfile.images?.[0]?.url}
							alt={userProfile.display_name ?? "프로필"}
							sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
							<PersonIcon fontSize="small" />
						</Avatar>
					</IconButton>
					{/* 프로필 버튼 바로 아래, 오른쪽 끝을 맞춰서 열린다 */}
					<Menu
						anchorEl={menuAnchor}
						open={Boolean(menuAnchor)}
						onClose={() => setMenuAnchor(null)}
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						transformOrigin={{ vertical: "top", horizontal: "right" }}>
						{/* marginInline : 호버 배경이 메뉴 양 끝에 붙지 않게 띄운다. borderRadius 로 배경 모서리를 둥글게 */}
						<MenuItem onClick={handleLogout} sx={{ marginInline: "6px", borderRadius: "4px" }}>
							로그아웃
						</MenuItem>
					</Menu>
				</>
			) : (
				<LoginButton />
			)}
		</Box>
	);
};

export default Navbar;
