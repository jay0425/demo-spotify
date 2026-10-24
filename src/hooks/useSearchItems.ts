import { useQuery } from "@tanstack/react-query";
import { searchItems } from "../apis/searchApi";
import { SearchRequest } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItems = (params: SearchRequest) => {
	const clientCredentialToken = useClientCredentialToken();
	return useQuery({
		queryKey: ["search", params], // 검색어나 옵션이 바뀌면 다시 요청한다
		queryFn: async () => {
			if (!clientCredentialToken) throw new Error("token이 available 하지 않음");
			return searchItems(clientCredentialToken, params);
		},
		// 토큰이 아직 없거나 검색어가 비어 있으면 요청하지 않는다. (빈 q 는 스포티파이에서 400 이다)
		enabled: !!clientCredentialToken && params.q.trim() !== "",
	});
};

export default useSearchItems;
