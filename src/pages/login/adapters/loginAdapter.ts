// adapters/authAdapter.ts
export interface TokenPair {
  token: string;
  refreshToken: string;
}

export const adaptToken = (data: any): TokenPair => ({
  token: data.accessToken,
  refreshToken: data.refreshToken
});
