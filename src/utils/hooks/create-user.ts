import { userFormSchema } from "@/utils/schemas"
import { z } from "zod"

import { axiosDefault } from "@/lib/axios"

type AuthProps = z.infer<typeof userFormSchema>

export const createUser = async (formData: AuthProps) => {
  try {
    const data = await axiosDefault.post("/users", formData)
    const user = data.data
    const status = data.status

    return { user, status }
  } catch (err) {
    throw err
  }
}
