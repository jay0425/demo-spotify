import { Typography } from "@mui/material";
import useGetNewReleases from "../../../../hooks/useGetNewReleases";

const NewReleases = () => {
	const { data, error, isLoading } = useGetNewReleases();
	console.log("ccccccc", data);
	return (
		<div>
			<Typography sx={{ variant: "h1", paddingTop: "8px" }}>New Released Albums</Typography>
		</div>
	);
};

export default NewReleases;

// 탄스택 쿼리 :
// API 호출할 때 필요한 일련의 과정들(로딩하고 데이터 오고 에러 처리할 수 있는)을 쉽게 처리할 수 있는 어떤 패키지.
// 그런걸 쉽게 처리할 수 있는 어떤 패키지.

// 훅 폴더 위치 :
// homepage 폴더 안에 api 호출하는 훅을 넣는다면 : 모듈화가 잘 되겠지. 홈페이지에서 쓰는건 홈페이지에서만 쓸 수 있으니까.
// 대신에 이훅을 나중에 다른 페이지에서 쓰게 되면 서로 관계가 얽힐 수 있다. <- 단점.
// 아니면 src 바로 밑에 훅 폴더 넣으면 모듈화는 덜 되더라도 여기저기 관계가 명확할 수는 있다.
// -> 관계가 명확하다 : 각 파일의 역할과 책임, 그리고 다른 파일과의 의존 관계를 쉽게 파악할 수 있다는 뜻
