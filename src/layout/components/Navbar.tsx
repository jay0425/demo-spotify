import { Avatar, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginButton from "../../common/components/ui/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const Navbar = () => {
	const { data: userProfile } = useGetCurrentUserProfile();
	console.log(userProfile);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
				paddingBlock: "10px",
			}}>
			{userProfile ? (
				// Avatar : 동그란 프로필 사진. images 는 배열이라 첫 번째(가장 큰) 이미지를 쓴다.
				// 사진이 없거나 못 불러오면 안쪽(children)의 사람 아이콘이 대신 보인다.
				<>
					어서와요, {userProfile.display_name}님
					<Avatar
						src={userProfile.images?.[0]?.url}
						alt={userProfile.display_name ?? "프로필"}
						sx={{ width: 32, height: 32, bgcolor: "primary.main", marginLeft: "8px" }}>
						<PersonIcon fontSize="small" />
					</Avatar>
				</>
			) : (
				<LoginButton />
			)}
		</Box>
	);
};

export default Navbar;
