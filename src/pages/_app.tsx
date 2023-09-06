import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { Toaster } from "@/components/ui/toaster"

interface Props extends AppProps {
  session: Session
}

export default function App({ Component, pageProps, session }: Props) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
