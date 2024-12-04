"use client"

import { useAuth } from "@/contexts/AuthProvider"
import { useToast } from "@/contexts/ToastProvider"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export function Subscribe() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()
  const { updateEmailIsSubscribing, emailIsSubscribing, user } = useAuth()

 
  async function handleSubscribe(e) {  // DB subscription request
    e.preventDefault()

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      let data
      try {
        data = await response.json()
      } catch {
        data = { error: await response.text() }
      }

      if (!response.ok) {
        const errorMessage = data.error || "Failed to subscribe. Please try again."
        throw new Error(errorMessage)
      }

      toast(`Tak! Du er nu tilmeldt nyhedsbrevet med email ${email}`, { duration: 2000 })
      
      updateEmailIsSubscribing(email, true)  // setEmailIsSubscribing helper function (localstorage)


    } catch (err) {
      console.error("Error during subscription:", err)

      const subscription = emailIsSubscribing.find((entry) => entry.email === email)
      if (subscription?.isSubscribing) {
        toast(
          <div className="flex flex-col gap-2">
            Du er allerede tilmeldt vores nyhedsbrev med email {email}. 
            {user ? (
              <Link href="/konto" className="text-blue-500">
                Gå til din konto for at se mere
              </Link>
            ) : (
              <Link href="/login" className="text-blue-500">
                Log ind for at se mere
              </Link>
            )}
          </div>,
          { duration: 5000 }
        )
      } else {

        toast(`Der er desværre sket en fejl. Prøv venligst igen.`, {
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubscribe} className="flex bg-white px-2 gap-2 w-full">
        <input
          type="email"
          name="email"
          placeholder="Indtast din email addresse"
          className="bg-white py-2 text-sm w-full outline-none"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <button type="submit">
          <Image src="/img/arrow.svg" alt="arrow" width={20} height={20} />
        </button>
      </form>
    </div>
  )
}


export function Unsubscribe({ text, className }) {
  const { toast } = useToast()
  const { updateEmailIsSubscribing, user } = useAuth()

  async function handleDelete() {
    try {
      const response = await fetch("/api/subscription", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete subscriber")
      }

      toast("Du er nu frameldt vores nyhedsbrev", { duration: 2000 })
      updateEmailIsSubscribing(user.email, false)
    } catch (err) {
      toast(err.message, { variant: "destructive", duration: 3000 })
    }
  }

  return (
    <div>
      <button onClick={handleDelete} className={`${className}`}>
        {text}
      </button>
    </div>
  )
}
