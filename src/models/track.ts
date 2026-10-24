import { SimplifiedAlbum } from "./album";
import { SimplifiedArtist } from "./artist";
import { ExternalUrls, Restriction } from "./commonType";

// 스포티파이 문서에 Required 표시가 없어서 전부 optional 이다.
export interface Track {
	album?: SimplifiedAlbum; // 이 트랙이 들어 있는 앨범
	artists?: SimplifiedArtist[];
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	available_markets?: string[];
	disc_number?: number; // 보통 1, 디스크가 여러 장인 앨범만 다르다
	duration_ms?: number;
	explicit?: boolean; // false 는 "아니다" 또는 "모르겠다" 라는 뜻
	external_ids?: {
		isrc?: string;
		ean?: string;
		upc?: string;
	};
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	is_playable?: boolean; // Track Relinking 이 적용됐을 때만 응답에 포함된다
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	linked_from?: Record<string, unknown>;
	restrictions?: Restriction;
	name?: string;
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	popularity?: number; // 0 ~ 100
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	preview_url?: string | null;
	track_number?: number;
	type?: "track";
	uri?: string;
	is_local?: boolean; // 로컬 파일에서 온 트랙인지
}
