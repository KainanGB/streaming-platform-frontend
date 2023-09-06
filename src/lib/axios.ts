import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getSession, signIn, signOut } from "next-auth/react"

const BASE_URL = "http://localhost:8888"

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const authAxios = axiosInstance

export async function fetchWithToken(
  config: AxiosRequestConfig
): Promise<AxiosResponse> {
  const session = await getSession()

  if (session) {
    config.headers = {
      ...config.headers,
      Authorization: `${session.user.accessToken}`,
    }
  }

  try {
    const response = await axiosInstance(config)
    return response
  } catch (error) {
    await signIn("refresh", {
      token: session?.user.refresh_token.id,
      redirect: false,
    })
  } finally {
    const newSession = await getSession()
    config.headers = {
      ...config.headers,
      Authorization: `${newSession?.user.accessToken}`,
    }
    const data = await axiosInstance(config)
    return data
  }
}
