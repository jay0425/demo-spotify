import axios from "axios";
import { clientid, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

// const encodedBase64 = (data: string): string => {
// 	return Buffer.from(data).toString("base64");
// };

const encodedBase64 = (data: string): string => {
	if (typeof window !== "undefined") {
		// 브라우저 환경
		return btoa(data);
	} else {
		// Node.js 환경
		return Buffer.from(data).toString("base64");
	}
};

export const getClientCredientialToken = async (): Promise<ClientCredentialTokenResponse> => {
	try {
		const body = new URLSearchParams({
			grant_type: "client_credentials",
		});
		const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
			headers: {
				Authorization: `Basic ${encodedBase64(clientid + ":" + clientSecret)}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(error.response?.data);
		throw new Error("client credential token fetch 실패");
	}
};
