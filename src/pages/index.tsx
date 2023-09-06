import { GetServerSideProps } from "next"
import { Inter } from "next/font/google"
import { getAuthSession } from "@/hooks/useSession"
import { signOut, useSession } from "next-auth/react"

import { fetchWithToken } from "@/lib/axios"
import { ModeToggle } from "@/components/toggle-themes"
import { toast } from "@/components/ui/use-toast"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { data: session, status } = useSession()

  const fetchUserData = async () => {
    try {
      const { data } = await fetchWithToken({
        url: `/users/${session?.user.userId}`,
      })
    } catch (err) {
      console.log("ERRO DUIFERENTE", err)
      // await signOut()
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ModeToggle />

      <button onClick={fetchUserData}>Fetch user</button>
      <button onClick={() => signOut()}>LOGOUT</button>
      <p>status: {status}</p>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getAuthSession(context)
}
