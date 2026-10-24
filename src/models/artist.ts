import { ExternalUrls, Image } from "./commonType";

// 스포티파이 문서에 Required 표시가 없어서 전부 optional 이다.
export interface SimplifiedArtist {
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	name?: string;
	type?: "artist";
	uri?: string;
}

export interface Artist {
	external_urls?: ExternalUrls;
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	followers?: {
		href: null; // 항상 null
		total?: number;
	};
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	genres?: string[];
	href?: string;
	id?: string;
	images?: Image[]; // 큰 이미지부터 순서대로
	name?: string;
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	popularity?: number; // 0 ~ 100
	type?: "artist";
	uri?: string;
}
