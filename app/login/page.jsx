import BannerHeading from '@/components/BannerHeading'
import LoginForm from '@/components/FormLogin'

export const metadata = {
  title: 'Log ind',
  alternates: {
      canonical: 'https://dinmaegler.vercel.app/login',
  }
}

export const dynamic = 'force-static'

export default function Login() {

  return (
    <>
      <BannerHeading heading="Log ind" />
      <div className="flex w-full justify-center items-center py-20">
        <div className='px-20 p-10 flex flex-col gap-2 shadow-md'>
          <h2 className='text-center text-2xl font-semibold py-4'>Log ind på din konto</h2>
          <LoginForm />

          <p>Log in med</p>
          <ul className='text-white flex gap-2 w-full'>
            <li className='p-2 px-6 bg-[#DD4B39]'>
              Google
            </li>
            <li className='p-2 px-4 bg-[#3B5999]'>
              Facebook
            </li>
            <li className='p-2 px-6 bg-primary'>
              Twitter
            </li>
          </ul>

        </div>
      </div>
    </>

  )
}

// Server-side login

// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

// async function loginAction(formData) {
//   'use server'
  
//   const email = formData.get('email')
//   const password = formData.get('password')

//   try {
//     const res = await fetch('https://dinmaegler.onrender.com/auth/local', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         identifier: email,
//         password: password,
//       }),
//     })

//     const data = await res.json()

//     if (!res.ok) {
//       return { error: data.message || 'Authentication failed' }
//     }

//     await cookies().set('token', data.jwt, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       path: '/'
//     })

//     return redirect('/')
//   } catch (error) {
//     return { error: 'An error occurred during login' }
//   }
// }

// export default async function Login() {
//   return (
//     <div className="flex w-full h-screen justify-center items-center">
//       <form action={loginAction} className="flex flex-col gap-4">
//         <div className="flex flex-col">
//           <label htmlFor="email">Email</label>
//           <input 
//             type="email" 
//             id="email" 
//             name="email"
//             required
//             className='border border-gray-300 rounded-md px-4 py-2' 
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="password">Password</label>
//           <input 
//             type="password" 
//             id="password" 
//             name="password"
//             required
//             className='border border-gray-300 rounded-md px-4 py-2'
//           />
//         </div>

//         <button 
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Log in
//         </button>
//       </form>
//     </div>
//   )
// }