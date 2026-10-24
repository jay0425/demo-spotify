import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedAudiobook } from "./audiobook";
import { SimplifiedEpisode } from "./episode";
import { SimplifiedPlaylist } from "./playlist";
import { SimplifiedShow } from "./show";
import { Track } from "./track";

export type SearchType = "album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook";

// GET /search 요청 쿼리.
export interface SearchRequest {
	q: string; // 검색어. "artist:BTS year:2020" 처럼 필터를 같이 쓸 수 있다
	type: SearchType[]; // 어떤 종류를 검색할지. 요청할 때는 "album,track" 처럼 쉼표로 합쳐서 보낸다
	market?: string; // ISO 3166-1 alpha-2 국가 코드 (예: "KR"). 없으면 "이용 불가" 로 취급된다
	limit?: number; // 종류별 가져올 개수. 기본 5, 0 ~ 10
	offset?: number; // 몇 번째 결과부터 가져올지. 기본 0, 0 ~ 1000
	include_external?: "audio"; // 외부에서 호스팅하는 오디오도 재생 가능으로 표시한다
}

// type 으로 요청한 종류만 응답에 들어온다. (album 만 요청하면 albums 만 온다)
export interface SearchResponse {
	tracks?: ApiResponse<Track>;
	artists?: ApiResponse<Artist>;
	albums?: ApiResponse<SimplifiedAlbum>;
	playlists?: ApiResponse<SimplifiedPlaylist>;
	shows?: ApiResponse<SimplifiedShow>;
	episodes?: ApiResponse<SimplifiedEpisode>;
	audiobooks?: ApiResponse<SimplifiedAudiobook>;
}
