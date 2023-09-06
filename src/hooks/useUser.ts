import { User } from "@/@types/user"

import { axiosDefault } from "@/lib/axios"

type UserResponse = {
  user: User
}

export const useUser = async (
  userId: string,
  token: string
): Promise<UserResponse> => {
  const { data } = await axiosDefault.get(`/users/${userId}`, {
    headers: {
      Authorization: token,
    },
  })

  return data
}
