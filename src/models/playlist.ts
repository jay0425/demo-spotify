import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";
import { Episode } from "./episode";
import { Track } from "./track";

// 플레이리스트 안의 트랙 목록은 링크(href)와 개수(total)만 온다.
export interface PlaylistItemsRef {
	href?: string;
	total?: number;
}

// SimplifiedPlaylist(목록용)와 Playlist(상세)가 같이 갖는 필드.
// 둘은 대부분 같고 items/tracks 의 타입만 달라서, 같은 부분은 여기 한 번만 쓰고 각자 extends 한다.
// 스포티파이 문서에 Required 표시가 없어서 전부 optional 이다.
export interface BasePlaylist {
	collaborative?: boolean; // 다른 사람이 수정할 수 있는 플레이리스트인지
	description?: string | null; // 수정된/인증된 플레이리스트에만 값이 있다
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	images?: Image[] | null; // 비어 있거나 최대 3개. url 은 하루 안에 만료되는 임시 주소다. 곡이 없는 플레이리스트는 null 로 온다
	name?: string;
	owner?: Owner;
	public?: boolean | null;
	snapshot_id?: string; // 플레이리스트 버전 식별자
	type?: "playlist";
	uri?: string;
}

// 목록(GET /me/playlists, 검색 결과)에 들어가는 플레이리스트. 곡 목록 대신 링크와 개수만 온다.
export interface SimplifiedPlaylist extends BasePlaylist {
	items?: PlaylistItemsRef;
	/** @deprecated items 를 사용한다 */
	tracks?: PlaylistItemsRef;
}

export interface GetCurrentUserPlaylistRequest {
	// 필수값이 아니므로 ?를 넣어준다.
	limit?: number; // 기본 20, 1 ~ 50
	offset?: number; // 기본 0, 최대 100,000
}

// 페이지 단위 응답이라 ApiResponse 의 items 에 SimplifiedPlaylist 를 넣어서 쓴다.
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface GetPlaylistRequest {
	playlist_id: string;
	market?: string;
	fields?: string;
	additional_types?: string;
}

// 플레이리스트 안의 한 줄 (GET /playlists/{id} 응답의 items.items 에 들어간다)
export interface PlaylistTrack {
	added_at?: string | null; // 추가된 시각. 아주 오래된 플레이리스트는 null 일 수 있다
	added_by?: Owner | null; // 이 곡을 추가한 사람
	is_local?: boolean; // 로컬 파일인지
	item?: Track | Episode | null; // 곡 또는 팟캐스트 에피소드. 더 이상 들을 수 없는 곡이면 null 일 수 있다
	/** @deprecated item 을 사용한다 */
	track?: Track | Episode | null;
}

// GET /playlists/{id} 응답. 목록용(SimplifiedPlaylist)과 달리 items 안에 곡 목록이 들어 있고, followers 도 온다.
// 단, 곡 목록은 내가 만들었거나 같이 편집하는 플레이리스트에만 온다. 남의 플레이리스트는 이름, 이미지 같은 정보만 온다.
export interface Playlist extends BasePlaylist {
	followers?: Followers;
	primary_color?: string | null;
	items?: ApiResponse<PlaylistTrack>; // 한 번에 최대 100곡까지 온다. 나머지는 next 주소로 더 불러온다
	/** @deprecated items 를 사용한다 */
	tracks?: ApiResponse<PlaylistTrack>;
}

export type GetPlaylistResponse = Playlist;
