export interface ExternalUrls {
	spotify?: string;
}

export interface Image {
	url: string;
	height: number | null;
	width: number | null;
}

export interface Restriction {
	reason?: "market" | "product" | "explicit"; // 문서에 "Additional reasons may be added" 라서 모르는 값이 올 수 있다
}

export interface Followers {
	href: null; // 항상 null
	total?: number;
}

export interface Copyright {
	text?: string;
	type?: string; // C = 저작권, P = 음원(실연) 저작권
}

export interface Owner {
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	type?: string;
	uri?: string;
	display_name?: string | null;
}
