import { getCurrentUser } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
  const user = await getCurrentUser()
  

  if (user) {
    return new Response(
      JSON.stringify({ authenticated: true, homes: user.homes, email: user.email }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } else {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    const res = await fetch('https://dinmaegler.onrender.com/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: data.message || 'Authentication failed' }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    
    const cookieStore = await cookies()

    
    cookieStore.set('token', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    // console.error('Login error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}