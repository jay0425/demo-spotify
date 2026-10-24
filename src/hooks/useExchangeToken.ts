import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";

// 데이터를 "가져오는" 게 아니라 code 를 보내서 토큰을 "만드는" 요청이라 useQuery 가 아니라 useMutation 을 쓴다.
// useMutation 은 기본으로 재시도하지 않는다. code 는 한 번만 쓸 수 있어서 그게 맞다.
const useExchangeToken = () => {
	return useMutation({
		mutationFn: ({ code, codeVerifier }: { code: string; codeVerifier: string }) =>
			exchangeToken(code, codeVerifier),
		// 훅에 넣은 onSuccess 는 화면(컴포넌트)이 사라져도 항상 실행된다.
		onSuccess: (data) => {
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);
			localStorage.removeItem("code_verifier"); // 다 쓴 값이라 지운다
		},
	});
};

export default useExchangeToken;
