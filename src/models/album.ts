import { ApiResponse } from "./apiResponse";
import { SimplifiedArtist } from "./artist";
import { ExternalUrls, Image, Restriction } from "./commonType";

// GET /browse/new-releases 요청 쿼리. 둘 다 안 보내면 기본값이 쓰인다.
export interface GetNewReleasesRequest {
	limit?: number; // 가져올 개수. 기본 20, 1 ~ 50
	offset?: number; // 몇 번째 아이템부터 가져올지. 기본 0. limit 과 같이 써서 다음 페이지를 가져온다
}

export interface GetNewReleasesResponse {
	albums: ApiResponse<SimplifiedAlbum>;
}

export interface SimplifiedAlbum {
	album_type: "album" | "single" | "compilation";
	total_tracks: number;
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[]; // 큰 이미지부터 순서대로
	name: string;
	release_date: string; // "1981-12" 처럼 release_date_precision 에 따라 형식이 다르다
	release_date_precision: "year" | "month" | "day";
	restrictions?: Restriction; // 재생 제한이 있을 때만 응답에 포함된다
	type: "album";
	uri: string;
	artists: SimplifiedArtist[];
}
