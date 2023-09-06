import { GetServerSideProps } from "next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession, Session } from "next-auth"
import { getSession } from "next-auth/react"

import { useRedirect } from "./useRedirect"

export const getAuthSession: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions(context.req, context.res)
  )
  return useRedirect({ session, path: context.resolvedUrl })
}

export async function getCurrentSession() {
  const session = await getSession()
  return session
}
