import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

// 플레이리스트 안의 트랙 목록은 링크(href)와 개수(total)만 온다.
export interface PlaylistItemsRef {
	href?: string;
	total?: number;
}

// 스포티파이 문서에 Required 표시가 없어서 전부 optional 이다.
export interface SimplifiedPlaylist {
	collaborative?: boolean; // 다른 사람이 수정할 수 있는 플레이리스트인지
	description?: string | null; // 수정된/인증된 플레이리스트에만 값이 있다
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	images?: Image[]; // 비어 있거나 최대 3개. url 은 하루 안에 만료되는 임시 주소다
	name?: string;
	owner?: Owner;
	public?: boolean | null;
	snapshot_id?: string; // 플레이리스트 버전 식별자
	items?: PlaylistItemsRef;
	/** @deprecated items 를 사용한다 */
	tracks?: PlaylistItemsRef;
	type?: string;
	uri?: string;
}

export interface GetCurrentUserPlaylistRequest {
	// 필수값이 아니므로 ?를 넣어준다.
	limit?: number; // 기본 20, 1 ~ 50
	offset?: number; // 기본 0, 최대 100,000
}

// 페이지 단위 응답이라 ApiResponse 의 items 에 SimplifiedPlaylist 를 넣어서 쓴다.
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
