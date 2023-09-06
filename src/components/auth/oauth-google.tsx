import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

const GoogleSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const user = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      })
      console.log("DEU RUIM", user)
    } catch (error) {
      console.log("DEU RUIM")
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      aria-label="Sign in with Google"
      variant="outline"
      className="w-full mb-4"
      onClick={isLoading ? undefined : loginWithGoogle}
      disabled={isLoading}
    >
      {isLoading ? (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
      )}
      Google
    </Button>
  )
}

export default GoogleSignIn
