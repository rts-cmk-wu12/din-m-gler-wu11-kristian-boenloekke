'use client'
import { useAuth } from '@/contexts/AuthProvider'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/contexts/ToastProvider'

export default function LoginForm() {
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  async function handleLogin(e) {
    e.preventDefault()

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!res.ok) {
        throw new Error('Login failed')
        
      }

      setUser(true)
      router.push('/')
    } catch (err) {
      console.error('Login error:', err)
      toast('Noget gik galt. Prøv igen.', { variant: 'destructive' }, { duration: 5000 })
      
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 pb-4">
          
          <label htmlFor="email" className='flex flex-col gap-1 w-full'>
              Email
            <input 
              type="email" 
              id="email" 
              name="email"
              required
              className='border px-4 py-2'
              onChange={(e) => setEmail(e.target.value)} 
              />
          </label>
        

          
          <label htmlFor="password" className="flex flex-col gap-1">
              Password
            <input 
              type="password" 
              id="password" 
              name="password"
              required
              className='border px-4 py-2'
              onChange={(e) => setPassword(e.target.value)}
              />
          </label>
          

          <button 
            type="submit"
            className="bg-primary text-white py-2 px-4"
          >
            Log in
          </button>
        </form>
  )
}