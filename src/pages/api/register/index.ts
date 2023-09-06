import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "next-auth"

import { axiosDefault } from "@/lib/axios"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body

  try {
    const response = await axiosDefault.post("/users", {
      email,
      password,
    })

    const user: User = response.data

    return res.status(200).send({ user })
  } catch (err) {
    res.status(500).send(err)
  }
}
