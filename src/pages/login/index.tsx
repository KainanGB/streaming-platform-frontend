import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { getAuthSession } from "@/hooks/useSession"
import { getServerSession } from "next-auth"

import { LoginForm } from "@/components/auth/login-form"
import GoogleSignIn from "@/components/auth/oauth-google"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page({
  session,
}: InferGetServerSidePropsType<typeof getAuthSession>) {
  return (
    <main className="grid place-items-center h-screen w-screen  bg-login-background bg-cover bg-center bg-no-repeat">
      <Card className="w-[600px] px-8">
        <CardHeader>
          <CardTitle>Log in to Sky Stream</CardTitle>
          <CardDescription>
            Start watching your favorites shows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignIn />
          <div className="flex flex-col items-center pt-6 pb-2">
            <div className="bg-slate-500 relative h-[1px] w-full"></div>
            <small className="bg-background px-6 relative bottom-3">
              OR CONTINUE WITH EMAIL
            </small>
          </div>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <small className="text-sm">Don't have an accout?</small>

          <Link
            className="ml-2 text-sm hover:border-b hover:border-neutral-400 cursor-pointer border-b border-transparent font-bold"
            href="/register"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getAuthSession(context)
}
