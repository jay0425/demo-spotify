import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from "../models/playlist";

// 무한 스크롤용. offset 은 react-query 가 페이지마다 pageParam 으로 넣어줘서 limit 만 받는다.
// data 는 응답 하나가 아니라 { pages: [1페이지 응답, 2페이지 응답, ...], pageParams: [0, 10, ...] } 모양이다.
const useGetCurrentUserPlaylists = ({
	limit,
}: Pick<GetCurrentUserPlaylistRequest, "limit"> = {}): UseInfiniteQueryResult<
	InfiniteData<GetCurrentUserPlaylistResponse, number>,
	Error
> => {
	return useInfiniteQuery({
		queryKey: ["current-user-playlists", { limit }], // limit 이 바뀌면 처음부터 다시 요청한다
		// queryFn 은 pageParam 하나가 아니라 { pageParam, queryKey, signal, ... } 객체를 받아서 꺼내 쓴다
		// pageParams 없으면 0 값. limit은 변하지 않고 offset만 값이 변할 것.
		queryFn: ({ pageParam = 0 }) => getCurrentUserPlaylists({ limit, offset: pageParam }),
		// 로그인 토큰이 있어야 하는 API 라서, 로그인 전에는 요청하지 않는다.
		// 값(!!accessToken)으로 주면 컴포넌트가 그려질 때의 값으로 고정된다. 함수로 주면 react-query 가 요청할지 판단할 때마다
		// 실행해서 지금 토큰이 있는지 본다. (로그아웃 직후 resetQueries 가 토큰 없이 다시 요청하는 걸 막는다)
		enabled: () => !!localStorage.getItem("access_token"),
		initialPageParam: 0, // 첫 페이지의 offset
		// getNextPageParam : useInfiniteQuery 의 핵심!! getNextPageParam 의 리턴값이 pageParam 으로 들어간다.
		// 다음 페이지의 offset. undefined면 다음 페이지가 없다는 뜻이다 (hasNextPage 가 false 가 된다)
		// 스포티파이는 마지막 페이지면 next 를 null 로 준다

		// useQuery에서 useInfiniteQuery로 바꿨더니 객체 형태가 변함... -> 확인 필요!! 숙지할것!!!!
		// useInfiniteQuery 를 사용하면 데이터를 여러 개 가져오는데
		// pages 라는 곳에 담아서 가져오게 된다.
		// pageParams 는 현재 바라보고 있는 페이지. [0] 이면 0번째 페이지.
		// 여늩 pages 안의 next 는 다음 페이지에 대한 정보. 다음 페이지를 가져올 수 있는 url을 통째로 제공해준다.
		// 그 url의 offset값을 보면 다음 페이지에 대한 offset을 알 수 있다. 가령 initialPageParam을 여기 코드에서 10으로 해두면
		// 그 url의 offset은 20으로 뜬다. 10 다음 페이지는 당연히 20일 테니까!

		getNextPageParam: (lastPage) => {
			if (lastPage.next) {
				const url = new URL(lastPage.next);
				const nextOffset = url.searchParams.get("offset");
				return nextOffset ? parseInt(nextOffset) : undefined;
			}
			return undefined; // undefined 는 다음 페이지 호출할게 없다. 숫자 값이면 다음 페이지를 계속 호출해주겠지...
		},

		// 혹은 아래처럼..
		// getNextPageParam: (lastPage) => (lastPage.next ? lastPage.offset + lastPage.limit : undefined),
	});
};

export default useGetCurrentUserPlaylists;
