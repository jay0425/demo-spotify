export interface ClientCredentialTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}

// 로그인 후 받은 code 를 토큰으로 바꿨을 때 응답 (POST /api/token, grant_type=authorization_code)
export interface ExchangeTokenResponse {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number; // 초 단위. 보통 3600 (1시간)
	refresh_token: string; // access token 이 만료됐을 때 새로 받는 데 쓴다
}

export interface AuthUrlParams {
	response_type: "code";
	client_id: string;
	scope: string;
	code_challenge_method: "S256";
	code_challenge: string;
	redirect_uri: string;
}
