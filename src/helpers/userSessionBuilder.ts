import { refreshedTokens, User } from "@/@types/user"

interface UserPayload {
  refreshedTokens: refreshedTokens
  user: User
}

export function userRefreshSessionBuilder({
  refreshedTokens,
  user,
}: UserPayload) {
  const transformedUser = {
    ...user,
    refresh_token: refreshedTokens.refreshToken,
    accessToken: refreshedTokens.accessToken,
    userId: user.id,
    name: user.username,
    subscribed: user.subscription,
    password: null,
  }

  return transformedUser
}

export function userSessionBuilder({}) {}
