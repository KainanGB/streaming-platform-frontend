import { refreshedTokens, UserRefreshPayload } from "@/@types/user"

import { axiosDefault } from "@/lib/axios"

export const refreshSession = async ({
  token,
}: UserRefreshPayload): Promise<refreshedTokens> => {
  const { data } = await axiosDefault.post("/refresh", {
    token,
  })
  const { accessToken, refreshToken } = data

  return { accessToken, refreshToken }
}
