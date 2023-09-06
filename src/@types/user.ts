export enum Roles {
  MEMBER,
  ADMIN,
}

export enum ACTIVE {
  INACTIVE,
  ACTIVE,
}

export type Subscribed = {
  isActive: ACTIVE
  endDate: Date
}

export type RefreshToken = {
  userId: string
  expiresIn: number
  id: string
}

export interface User {
  id: string
  email: string
  refresh_token: RefreshToken | null
  username: string | null
  created_at: Date
  subscription: Subscribed
  updated_at: Date
  role: Roles
  password: string
}

export type UserAuthPayload = {
  email: string
  password: string
}

export type UserAuthResponse = {
  accessToken: string
  user: User
}

export type UserRefreshPayload = {
  token: string
}

export type refreshedTokens = {
  refreshToken: RefreshToken
  accessToken: string
}
