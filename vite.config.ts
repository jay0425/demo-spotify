/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()], // jsx/tsx 변환과 개발 중 새로고침 없이 화면 갱신(HMR)을 해준다. 예전 babel-loader 역할.
	// .env 파일 중 이 접두사로 시작하는 변수만 import.meta.env 로 브라우저 코드에 넣어준다.
	// 기본값은 VITE_ 인데, 기존 변수 이름(REACT_APP_, SPOTIFY_)을 그대로 쓰려고 추가했다.
	// .env, .env.development(개발), .env.production(빌드) 는 vite 가 알아서 모드에 맞게 읽는다. 예전 dotenv-webpack 역할.
	envPrefix: ["VITE_", "REACT_APP_", "SPOTIFY_"],
	server: {
		// 스포티파이 redirect URI 가 127.0.0.1:3000 이라 주소와 포트를 고정한다.
		host: "127.0.0.1",
		port: 3000,
		strictPort: true, // 3000 이 사용 중이면 다른 포트로 넘어가지 않고 에러를 낸다 (redirect URI 가 어긋나지 않게)
		open: true,
	},
	test: {
		environment: "happy-dom", // 테스트에서 브라우저 DOM 을 흉내낸다
		globals: true, // test, expect 를 import 없이 쓴다 (jest 처럼)
		setupFiles: "./src/setupTests.ts",
	},
});
