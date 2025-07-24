'use client';
import { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig'; // Alias import
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import Images from '../assets';
import { Eye, EyeOff } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Loader from '../components/Loader';


export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext)

  const validateForm = () => {
    const { email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    const newErrors = { email: '', password: '' };
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value.trimStart() }));
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push('/')
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error('Please enter valid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme === 'dark' ? '' : ''}`}>
      {!loading ? <div className={` shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden ${theme === 'dark' ? 'bg-dark-color' : 'bg-light-color'} `}>
        {/* Left Image Panel */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2  p-8">
          <Image
            src={Images.SearchIcon}
            alt="Illustration"
            width={300}
            height={300}
          />
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-8 pt-4">

          <div className='flex justify-between'>
            <div>
              <h2 className="text-2xl font-bold mb-2">Near By Places Finder</h2>
              <p className="text-sm mb-6">Please login or sign up to continue</p>
            </div>


            <div className="flex justify-end mb-4">
              <label className="relative inline-flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={toggleTheme}
                  checked={theme === 'dark'}
                />
                <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
                  <div
                    className={`absolute top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 transform peer-checked:translate-x-6 ${theme === 'dark' ? `left-[50%]` : `left-[1%]`
                      }`}
                  />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 mt-1">
                  {theme === 'light' ? <Sun size={20} color='black' /> : <Moon size={20} color='white' />}
                </span>
              </label>
            </div>

          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 mb-2 border rounded-md border-grey-500 focus:outline-none focus:ring-2 
    placeholder-gray-500 dark:placeholder-gray-300
    ${errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'}
  `}
          />
          {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your Password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`w-full px-4 py-3 pr-12 mb-2 border rounded-md 
    placeholder-gray-500 dark:placeholder-gray-300
    focus:outline-none focus:ring-2 
    ${errors.password
                  ? 'border-red-500 focus:ring-red-400 dark:focus:ring-red-400'
                  : ' focus:ring-blue-400 dark:focus:ring-blue-400'}
  `}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 "
            >
              {showPassword ?<Eye size={20} />:<EyeOff size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mb-3">{errors.password}</p>}

          {/* Submit Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
          >
            Log In
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div> : <Loader />}
    </div>
  );
}