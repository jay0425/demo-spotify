// 스포티파이의 페이지 단위 응답 (paging object). items 에 들어가는 타입만 바꿔서 재사용한다.

// 겹치는 타입들을 템플릿화
export interface ApiResponse<T> {
	href: string;
	limit: number;
	next: string | null; // 다음 페이지가 없으면 null
	offset: number;
	previous: string | null; // 이전 페이지가 없으면 null
	total: number;
	items: T[];
}
