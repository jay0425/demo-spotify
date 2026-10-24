import { useQueryClient } from "@tanstack/react-query";

// 로그아웃 : 저장해둔 토큰과 로그인한 사용자 정보를 지운다.
// 스포티파이에는 토큰을 무효화하는 API 가 없어서, 우리 앱에서만 로그아웃된다.
const useLogout = () => {
	const queryClient = useQueryClient();
	return () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		// 캐시에 남아 있으면 로그아웃해도 프로필이 계속 보여서 지운다.
		queryClient.removeQueries({ queryKey: ["current-user-profile"] });
	};
};

export default useLogout;
