import "./App.css";
import { Route, Routes } from "react-router";
import React, { Suspense } from "react";
import LoadingSpinner from "./common/components/ui/LoadingSpinner";
import HomePage from "./layout/pages/HomePage/HomePage";

// React.lazy는 default export된 컴포넌트만 불러올 수 있다.
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
// const HomePage = React.lazy(() => import("./layout/pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./layout/pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
	() => import("./layout/pages/SearchWithKeywordPage/SearchWithKeywordPage"),
);
const PlaylistPage = React.lazy(() => import("./layout/pages/PlaylistPage/PlaylistPage"));
const PlaylistDetailPage = React.lazy(
	() => import("./layout/pages/PlaylistDetailPage/PlaylistDetailPage"),
);
const CallbackPage = React.lazy(() => import("./layout/pages/CallbackPage/CallbackPage"));

// 로그인 페이지는 스포티파이가 만들어줘서 우리가 만들어주지 않는다.

// 0. 사이드바. (플리, 메뉴)
// 1. 홈페이지 /
// 2. 서치페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플리 디테일 페이지 /playlist/:id
// 5. 모바일 : 플리 보여주는 페이지 /playlist

// SPA(싱글 페이지 애플리케이션): HTML 페이지는 하나만 받고, 페이지 이동 시 서버에서 새 HTML을 받지 않고 JS가 화면 내용만 바꾼다.
// URL에 맞는 컴포넌트로 화면을 바꿔주는건 리액트 라우터가 한다.

// lazy loading :
// js 코드를 처음에 다 들고 오는게 아니라, 해당 페이지가 처음 렌더링되는 순간(예: /search로 이동) 그 파일을 다운 받아서 들고 온다.
// 각 페이지가 별도 청크 파일로 분리된다 -> 초기 번들 사이즈 감소 -> 초기 화면의 로딩 속도가 빨라진다. (전체 코드 양이 줄어드는건 아님)
// lazy 컴포넌트는 다운로드 중에 보여줄 화면이 필요해서 <Suspense fallback>으로 감싸야 한다.
function App() {
	return (
		// Suspense는 리액트 컴포넌트가 로딩 상태일때 관리해주는 어떤 도구. 비동기 상태 관리해주는 도구. 아직 js파일 안왔어? 그럼 로딩 화면 보여줄게~~ js 오고 있는 중입니다~~~~
		// <Suspense fallback={<LoadingSpinner />}>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path="search" element={<SearchPage />} />
				<Route path="search/:keyword" element={<SearchWithKeywordPage />} />
				<Route path="playlist/:id" element={<PlaylistDetailPage />} />
				<Route path="playlist" element={<PlaylistPage />} />
				{/* 스포티파이 로그인 후 돌아오는 주소 (.env 의 REACT_APP_REDIRECT_URI) */}
				<Route path="callback" element={<CallbackPage />} />
			</Route>
			{/* <Route path="/admin" element={AdminLayout} /> */}
		</Routes>
		// </Suspense>
	);
}

export default App;

// 바벨은 최신 js 문법(+ JSX, TypeScript)을 브라우저가 이해할 수 있는 js로 변환해주는 컴파일러(트랜스파일러)다.
// 브라우저 호환성을 높여준다. (단, 문법 변환만 하고 Promise 같은 새 기능은 polyfill이 따로 필요)

// 웹팩 :
// js, css, image 이런걸 번들링해주는 도구. (모듈 번들러)
// 브라우저가 수많은 파일을 하나하나 요청하면 요청 수가 많아져 느려진다. 그래서 합쳐서 제공하는게 번들링.
// 플젝의 여러개의 파일들을 의존 관계(import)를 따라 합쳐서 브라우저가 이해할 수 있는 번들파일로 만든다.
// lazy(동적 import)를 쓰면 하나가 아니라 여러개의 청크 단위 번들 파일로 나뉘어 나온다.
// 트리 쉐이킹(tree shaking): 실제로 쓰이지 않는 코드를 번들에서 빼는 최적화. (production 모드에서 동작)
// 개발 시에는 dev server + HMR로 코드를 바꾸면 새로고침 없이 바로 화면에 반영된다.
