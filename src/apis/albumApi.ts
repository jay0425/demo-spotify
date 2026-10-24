import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetNewReleasesRequest, GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (token: string): Promise<GetNewReleasesResponse> => {
	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error("new Releases fetch 실패");
	}
};
