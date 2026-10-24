import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Card from "../../../../common/components/Card";
import ErrorMessage from "../../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../../common/components/ui/LoadingSpinner";
import useSearchItems from "../../../../hooks/useSearchItems";
import { DUMMY_ALBUMS } from "../../../../mocks/albums";

// /browse/new-releases 가 막혀서 검색 API 의 tag:new 필터(최근 2주 안에 나온 앨범)로 대신 가져온다.
const NewAlbums = () => {
	const { data, error, isPending } = useSearchItems({ q: "tag:new", type: ["album"], limit: 6 });
	// isPending : 토큰을 기다리는 중(아직 요청 전)일 때도 true 라서 그동안 "No Data" 대신 로딩을 보여준다.
	if (isPending) {
		return <LoadingSpinner />;
	}
	// 403 : 앱 소유자 계정에 Premium 이 없어서 스포티파이가 막은 상태. 화면 작업을 계속할 수 있게 더미 데이터를 보여준다.
	const cause = error?.cause;
	const isForbidden = axios.isAxiosError(cause) && cause.response?.status === 403;
	if (error && !isForbidden) {
		return <ErrorMessage errorMessage={error.message} />;
	}
	const albums = isForbidden ? DUMMY_ALBUMS : (data?.albums?.items ?? []);
	return (
		<div>
			<Typography variant="h1" sx={{ paddingTop: "8px" }}>
				New Released Albums
			</Typography>
			{isForbidden && (
				<Typography variant="body1" color="text.secondary">
					스포티파이 API 403(앱 소유자 Premium 필요)이라 더미 데이터를 보여주고 있습니다.
				</Typography>
			)}
			{albums.length > 0 ? (
				<Grid container spacing={1}>
					{albums.map((album) => (
						// 12칸 중 몇 칸을 쓸지 : 모바일(xs) 6칸 → 2개, 태블릿(sm) 4칸 → 3개, 데스크탑(md 이상) 2칸 → 6개
						<Grid key={album.id} size={{ xs: 6, sm: 4, md: 2 }}>
							<Card
								image={album.images[0]?.url}
								title={album.name}
								subtitle={album.artists.map((artist) => artist.name).join(", ")}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="h2">No Data</Typography>
			)}
		</div>
	);
};

export default NewAlbums;

// 탄스택 쿼리 :
// API 호출할 때 필요한 일련의 과정들(로딩하고 데이터 오고 에러 처리할 수 있는)을 쉽게 처리할 수 있는 어떤 패키지.
// 그런걸 쉽게 처리할 수 있는 어떤 패키지.

// 훅 폴더 위치 :
// homepage 폴더 안에 api 호출하는 훅을 넣는다면 : 모듈화가 잘 되겠지. 홈페이지에서 쓰는건 홈페이지에서만 쓸 수 있으니까.
// 대신에 이훅을 나중에 다른 페이지에서 쓰게 되면 서로 관계가 얽힐 수 있다. <- 단점.
// 아니면 src 바로 밑에 훅 폴더 넣으면 모듈화는 덜 되더라도 여기저기 관계가 명확할 수는 있다.
// -> 관계가 명확하다 : 각 파일의 역할과 책임, 그리고 다른 파일과의 의존 관계를 쉽게 파악할 수 있다는 뜻
