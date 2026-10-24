import { getSpotifyAuthUrl } from "../../../utils/auth";
import Button from "./Button";

const LoginButton = () => {
	const login = () => {
		getSpotifyAuthUrl();
	};
	return (
		<Button variant="contained" size="large" onClick={login}>
			로그인
		</Button>
	);
};

export default LoginButton;
