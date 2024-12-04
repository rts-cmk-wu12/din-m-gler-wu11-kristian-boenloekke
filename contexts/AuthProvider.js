'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { decryptData, encryptData } from '@/lib/utils'

// Context provider til at checke for bruger-authentification client-side. 
//    Fetchuser() får GET() i @app/api/auth/route.js som kun returnerer auth-status + brugers 'homes' og 'email'
//    For bruger-auth på server-side, og samtlig info om bruger -> getCurrentUser() fra @/lib/auth

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [usersFavoriteHomes, setUsersFavoriteHomes] = useState([]) // til at håndtere instant UI opdatering af db's user.homes
  const [emailIsSubscribing, setEmailIsSubscribing] = useState([]) // til at gemme og hente status af submittede email-subscriptioner i localstorage

  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('emailIsSubscribing')
    if (savedSubscriptions) {
      setEmailIsSubscribing(decryptData(savedSubscriptions))
    }
  }, [])  

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth', { method: 'GET' })
        if (response.ok) {
          const { authenticated, homes, email } = await response.json()
          if (authenticated) {
            setUser({ homes, email })
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (user?.homes) {
      setUsersFavoriteHomes(user.homes)
    }
  }, [user])


// state setter helper funktion, som bliver kaldt i @/components/SubscriptionRCC -> Subscribe() og Unsubscribe()
//   - man kan tilmelde sig nyhedsbrev uden at have en konto eller være logget ind -> Subscribe() -> updateEmailIsSubscribing(email, true)
//   - man skal have en konto og være logget ind for at framelde sig nyhedsbrev -> Unsubscribe() -> updateEmailIsSubscribing(user.email, false)

  function updateEmailIsSubscribing(email, isSubscribing) {
    setEmailIsSubscribing((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.email === email)
      let updatedSubscriptions

      if (existingIndex !== -1) {
        updatedSubscriptions = [...prev]
        updatedSubscriptions[existingIndex].isSubscribing = isSubscribing
      } else {
        updatedSubscriptions = [...prev, { email, isSubscribing }]
      }
      const encryptedData = encryptData(updatedSubscriptions)
      localStorage.setItem('emailIsSubscribing', encryptedData)
  
      return updatedSubscriptions
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user, setUser,
        usersFavoriteHomes, setUsersFavoriteHomes,
        emailIsSubscribing, updateEmailIsSubscribing
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
