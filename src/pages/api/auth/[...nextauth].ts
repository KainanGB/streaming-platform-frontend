import { NextApiRequest, NextApiResponse } from "next"
import { userRefreshSessionBuilder } from "@/helpers/userSessionBuilder"
import { useUser } from "@/hooks/useUser"
import AppError from "@/utils/AppError"
import { createSession } from "@/utils/hooks/create-session"
import { refreshSession } from "@/utils/hooks/refresh-session"
import { userFormSchema, userRefreshTokenSchema } from "@/utils/schemas"
import { AxiosError } from "axios"
import { verify as verifyJWT } from "jsonwebtoken"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react"

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions

export const authOptions: NextAuthOptionsCallback = (_req, res) => {
  return {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      CredentialsProvider({
        id: "session",
        name: "Credentials",
        type: "credentials",
        credentials: {},
        async authorize(credentials, _req) {
          try {
            const { email, password } = userFormSchema.parse(credentials)

            const user = await createSession({
              email,
              password,
            })

            if (!user) {
              return null
            }

            return user
          } catch (err) {
            if (err instanceof AxiosError) {
              throw new AppError(err.response?.data)
            }
            throw err
          }
        },
      }),

      CredentialsProvider({
        id: "refresh",
        name: "Credentials",
        type: "credentials",
        credentials: {},
        async authorize(credentials, _req): Promise<any> {
          try {
            const { token } = userRefreshTokenSchema.parse(credentials)

            const refreshedTokens = await refreshSession({
              token,
            })

            const { user } = await useUser(
              refreshedTokens.refreshToken.userId,
              refreshedTokens.accessToken
            )

            if (
              !refreshedTokens.accessToken ||
              !refreshedTokens.refreshToken ||
              !user
            ) {
              return null
            }

            const transformedUser = userRefreshSessionBuilder({
              user,
              refreshedTokens,
            })

            return transformedUser
          } catch (err) {
            throw err
          }
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token = {
            accessToken: user.accessToken,
            refresh_token: user.refresh_token,
            userId: user.id,
            role: user.role,
            subscribed: user.subscribed,
          }
        }

        return token
      },
      async session({ session, token }) {
        session.user.name = null
        session.user.email = null
        session.user.image = null
        session.user.userId = token.userId
        session.user.role = token?.role
        session.user.subscribed = token?.subscribed
        session.user.accessToken = token.accessToken
        session.user.refresh_token = token.refresh_token

        try {
          await verifyJWT(session.user.accessToken, process.env.JWT_SECRET!)
        } catch (err) {
          await signIn("refresh", {
            token: session?.user.refresh_token.id,
            redirect: false,
          })
        } finally {
          return session
        }
      },
    },
    pages: {
      signIn: "/login",
    },
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res))
}
