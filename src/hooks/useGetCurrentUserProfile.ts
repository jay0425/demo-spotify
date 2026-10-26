import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
	return useQuery({
		queryKey: ["current-user-profile"],
		queryFn: getCurrentUserProfile,
		// 함수로 줘야 요청할지 판단할 때마다 지금 토큰을 본다. (useGetCurrentUserPlaylists 주석 참고)
		enabled: () => !!localStorage.getItem("access_token"),
	});
};

export default useGetCurrentUserProfile;
