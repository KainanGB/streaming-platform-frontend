import { Session } from "next-auth"

type RedirectProps = {
  session: Session | null
  path: string
}

export function useRedirect({ session, path }: RedirectProps) {
  const hasSession = session?.user.userId
  const paths: string[] = ["/register", "/login"]

  if (hasSession && paths.includes(path)) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else if (!hasSession && !paths.includes(path)) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}
