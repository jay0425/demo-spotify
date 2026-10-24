import { SimplifiedAlbum } from "../models/album";

// 스포티파이 API 를 못 쓸 때(403 등) 화면 작업용으로 보여주는 가짜 앨범 데이터.
// 이미지는 picsum.photos 의 고정 시드 이미지라서 새로고침해도 같은 그림이 나온다.
const createDummyAlbum = (
	id: string,
	name: string,
	artistName: string,
	releaseDate: string,
): SimplifiedAlbum => ({
	album_type: "album",
	total_tracks: 10,
	available_markets: [],
	external_urls: {},
	href: "",
	id,
	images: [{ url: `https://picsum.photos/seed/${id}/640/640`, height: 640, width: 640 }],
	name,
	release_date: releaseDate,
	release_date_precision: "day",
	type: "album",
	uri: `spotify:album:${id}`,
	artists: [{ id: `${id}-artist`, name: artistName, type: "artist" }],
});

export const DUMMY_ALBUMS: SimplifiedAlbum[] = [
	createDummyAlbum("dummy-album-1", "Morning Cookie", "Bear Bakery", "2026-10-24"),
	createDummyAlbum("dummy-album-2", "Honey Jar Days", "The Brown Paws", "2026-10-22"),
	createDummyAlbum("dummy-album-3", "Late Night Latte", "Cocoa Club", "2026-10-20"),
	createDummyAlbum("dummy-album-4", "Forest Walk", "Maple & Oak", "2026-10-18"),
	createDummyAlbum("dummy-album-5", "Warm Blanket", "Sleepy Bear Trio", "2026-10-15"),
	createDummyAlbum("dummy-album-6", "Butter Sunset", "Caramel Waves", "2026-10-13"),
];
