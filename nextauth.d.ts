import { Roles, Subscribed } from "@/@types"
import { RefreshToken } from "@/@types/user"
import { DefaultSession, Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User
  }

  interface User {
    role: Roles
    subscribed: Subscribed
    accessToken: string
    userId: string
    id: string
    refresh_token: RefreshToken
    name: string | null
    created_at: Date
    subscribed: Date
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    userId: string
    role: Roles
    subscribed: Subscribed
    refresh_token: RefreshToken
  }
}
