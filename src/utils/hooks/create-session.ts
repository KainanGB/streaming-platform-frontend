import { UserAuthPayload } from "@/@types/user"
import { User } from "next-auth"

import { axiosDefault } from "@/lib/axios"

export const createSession = async ({ email, password }: UserAuthPayload) => {
  const { data } = await axiosDefault.post("/sessions", {
    email,
    password,
  })

  const { accessToken, user } = data

  const transformedUser = {
    ...user,
    accessToken,
    userId: user.id,
    name: user.username,
    subscribed: user.subscription,
    password: null,
  } as User

  return transformedUser
}
