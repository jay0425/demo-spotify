import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/ui/LoadingSpinner";
import useExchangeToken from "../../../hooks/useExchangeToken";

// 스포티파이 로그인이 끝나면 redirect_uri(/callback?code=...) 로 돌아온다.
// 여기서 code 를 access token 으로 바꾸고 홈으로 보낸다.
const CallbackPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { mutate: exchangeToken, error } = useExchangeToken();
	// 개발 모드의 StrictMode 는 useEffect 를 두 번 실행한다. code 는 한 번만 쓸 수 있어서 두 번째 요청을 막는다.
	const isRequested = useRef(false);

	const code = searchParams.get("code");
	// 로그인 버튼을 누를 때 localStorage 에 저장해둔 값. localhost 와 127.0.0.1 은 저장소가 따로라서 접속 주소가 다르면 없다.
	const codeVerifier = localStorage.getItem("code_verifier");

	useEffect(() => {
		if (isRequested.current) return;
		isRequested.current = true;
		// 사용자가 로그인 화면에서 "취소" 하면 code 대신 ?error=access_denied 로 돌아온다.
		if (!code) {
			navigate("/", { replace: true });
			return;
		}
		if (!codeVerifier) return;
		exchangeToken(
			{ code, codeVerifier },
			// replace : /callback?code=... 를 방문 기록에서 지워서, 뒤로 가기로 다시 오지 않게 한다.
			{ onSuccess: () => navigate("/", { replace: true }) },
		);
	}, [code, codeVerifier, exchangeToken, navigate]);

	if (code && !codeVerifier) {
		return (
			<ErrorMessage errorMessage="로그인 정보(code_verifier)를 찾을 수 없어요. http://127.0.0.1:3000 으로 접속해서 다시 로그인해 주세요." />
		);
	}
	if (error) {
		return <ErrorMessage errorMessage={error.message} />;
	}
	return <LoadingSpinner />;
};

export default CallbackPage;
