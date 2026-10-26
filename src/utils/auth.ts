import { CLIENT_ID, SCOPES } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

// 로그인 함수
export const getSpotifyAuthUrl = async () => {
	const codeVerifier = generateRandomString(64);
	const hashed = await sha256(codeVerifier);
	const codeChallenge = base64encode(hashed);

	const clientId = CLIENT_ID;
	const redirectUri = REDIRECT_URI;

	// 얼마나 많은 허가가 필요한가
	const scope = SCOPES;
	const authUrl = new URL("https://accounts.spotify.com/authorize");

	// generated in the previous step
	window.localStorage.setItem("code_verifier", codeVerifier);

	/**  유니온 타입은 강력한 기능이지만, 신입 개발자가 자주 남발하는 실수 중 하나다.
	 1. 불필요한 undefined 추가: API에서 필수 값을 undef ined로 허용하는 것은 오히려 예기치 않은 에러를 유발할 수 있다.
	 2. 올바른 타입 강제하기: 타입스크립트의 타입 강제 기능을 활용하여 코드의 안정성을 높여야 한다.
	유니온 타입을 남발하기보다 정확한 타입 설계를 통해 타입스크립트의 장점을 극대화하는 것이 중요하다.
  */
	if (clientId && redirectUri) {
		// 있어야 하는 값이 undefined 일수도 있다고 경고 뜨면 타입에 넣을게 아니라 if문으로 걸려줄것!!!
		const params: AuthUrlParams = {
			response_type: "code",
			client_id: clientId,
			scope,
			code_challenge_method: "S256",
			code_challenge: codeChallenge,
			redirect_uri: redirectUri,
		};
		authUrl.search = new URLSearchParams(Object.entries(params)).toString();
		window.location.href = authUrl.toString(); // 스포티파이 로그인 주소 열기
	}
};
