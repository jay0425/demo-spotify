import { ExternalUrls, Image, Restriction } from "./commonType";
import { SimplifiedShow } from "./show";

export interface SimplifiedEpisode {
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	audio_preview_url: string | null; // 30초 미리듣기 (MP3)
	description: string; // HTML 태그가 제거된 설명
	html_description: string; // HTML 태그가 포함될 수 있는 설명
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[]; // 큰 이미지부터 순서대로
	is_externally_hosted: boolean;
	is_playable: boolean;
	/** @deprecated languages 를 사용한다 */
	language?: string;
	languages: string[]; // ISO 639-1
	name: string;
	release_date: string; // release_date_precision 에 따라 "1981" / "1981-12" / "1981-12-15"
	release_date_precision: "year" | "month" | "day";
	// 유저 토큰이고 user-read-playback-position 스코프가 있을 때만 포함된다
	resume_point?: {
		fully_played?: boolean;
		resume_position_ms?: number;
	};
	type: "episode";
	uri: string;
	restrictions?: Restriction;
}

// 에피소드 하나를 받을 때(플레이리스트 안의 에피소드 등)는 어느 쇼(팟캐스트)의 에피소드인지도 같이 온다.
export interface Episode extends SimplifiedEpisode {
	show: SimplifiedShow;
}
