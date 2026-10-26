import { useQueryClient } from "@tanstack/react-query";

// 로그아웃 : 저장해둔 토큰과 로그인한 사용자 정보를 지운다.
// 스포티파이에는 토큰을 무효화하는 API 가 없어서, 우리 앱에서만 로그아웃된다.
const useLogout = () => {
	const queryClient = useQueryClient();
	return () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		// 캐시에 남아 있으면 로그아웃해도 프로필, 플레이리스트가 계속 보여서 처음 상태(데이터 없음)로 되돌린다.
		// removeQueries 는 캐시에서 빼기만 하고, 이미 화면에 떠 있는 컴포넌트한테는 알려주지 않는다.
		// 그래서 그 컴포넌트가 다른 이유로 다시 그려지기 전까지 예전 데이터가 그대로 보인다.
		// resetQueries 는 쿼리를 처음 상태로 바꾸면서 그 쿼리를 쓰는 컴포넌트를 다시 그리게 한다.
		// (reset 후 다시 요청도 하는데, 위에서 토큰을 지웠으니 enabled 가 false 라서 요청은 안 간다)
		queryClient.resetQueries({ queryKey: ["current-user-profile"] });
		queryClient.resetQueries({ queryKey: ["current-user-playlists"] }); // 앞부분만 같으면 limit 상관없이 다 되돌린다
	};
};

export default useLogout;
