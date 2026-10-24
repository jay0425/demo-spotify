import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
	const clientCredentialToken = useClientCredentialToken();
	return useQuery({
		queryKey: ["new-releases"],
		queryFn: async () => {
			if (!clientCredentialToken) throw new Error("token이 available 하지 않음");
			return getNewReleases(clientCredentialToken);
		},
	});
};

export default useGetNewReleases;
