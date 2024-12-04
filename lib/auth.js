'use server'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('token')
  const token = tokenCookie ? tokenCookie.value : null
  
  if (!token) {
    return null
  }

  try {
    const response = await fetch('https://dinmaegler.onrender.com/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}