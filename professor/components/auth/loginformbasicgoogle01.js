"use client";

import { signIn } from 'next-auth/react'

const Login = () => {
  return (
    <button onClick={() => signIn('google')}>Sign in with Google</button>
  )
}
export default Login; 
