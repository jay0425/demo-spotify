/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

// import.meta.env 로 읽는 .env 변수들의 타입
interface ImportMetaEnv {
	readonly REACT_APP_SPOTIFY_CLIENT_ID?: string;
	readonly REACT_APP_SPOTIFY_SECRET_ID?: string;
	readonly REACT_APP_REDIRECT_URI?: string;
	readonly SPOTIFY_BASE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
