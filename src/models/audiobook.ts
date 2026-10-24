import { Copyright, ExternalUrls, Image } from "./commonType";

export interface SimplifiedAudiobook {
	authors: { name?: string }[];
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	available_markets: string[];
	copyrights: Copyright[];
	description: string; // HTML 태그가 제거된 설명
	html_description: string; // HTML 태그가 포함될 수 있는 설명
	edition?: string; // "Unabridged" 등
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[]; // 큰 이미지부터 순서대로
	languages: string[]; // ISO 639
	media_type: string;
	name: string;
	narrators: { name?: string }[];
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	publisher: string;
	type: "audiobook";
	uri: string;
	total_chapters: number;
}
