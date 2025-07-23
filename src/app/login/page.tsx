'use client';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
   const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!')
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
           toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
