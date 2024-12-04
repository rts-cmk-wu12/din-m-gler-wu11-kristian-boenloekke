'use client';

import { useAuth } from '@/contexts/AuthProvider';
import { logout } from '@/lib/auth';

export default function LogoutButton({className, children}) {
  const { setUser} = useAuth()

  function handleLogOut() {
    logout()
    setUser(null)
  }
  
  return (
    <button onClick={handleLogOut} className={`text-left ${className}`}>
      {children}
    </button>
  )
}