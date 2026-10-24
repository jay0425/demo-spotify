import { ExternalUrls, Followers, Image } from "./commonType";

// GET /me 응답 (로그인한 사용자의 프로필). 스포티파이 문서에 Required 표시가 없어서 전부 optional 이다.
export interface User {
	account_id?: string; // 계정을 연결할 때는 id 대신 이걸 쓴다. 절대 바뀌지 않는 값
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	country?: string; // ISO 3166-1 alpha-2 (예: "KR"). user-read-private 스코프가 있을 때만 온다
	display_name?: string | null; // 프로필에 보이는 이름. 없으면 null
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	email?: string; // 인증되지 않은 이메일. user-read-email 스코프가 있을 때만 온다
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	explicit_content?: {
		filter_enabled?: boolean; // true 면 19금 콘텐츠를 재생하지 않는다
		filter_locked?: boolean; // true 면 사용자가 이 설정을 바꿀 수 없다
	};
	external_urls?: ExternalUrls;
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	followers?: Followers;
	href?: string;
	id?: string; // 계정 연결에는 쓰지 말고 account_id 를 쓴다
	images: Image[]; // 프로필 이미지. 사진이 없으면 빈 배열 [] 로 온다
	/** @deprecated 스포티파이에서 더 이상 권장하지 않는 필드 */
	product?: string; // 구독 등급. "premium" | "free" | "open"(= free) 등. user-read-private 스코프가 있을 때만 온다
	type?: "user";
	uri?: string;
}
