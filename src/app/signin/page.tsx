"use client";

import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import Images from '../assets/index';
import { ThemeContext } from '../context/ThemeContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../utils/firebaseConfig';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';

const SignUp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

const handleChange = (field: string, value: string) => {
  // Prevent first character from being a space
  if (value.length === 1 && value[0] === ' ') return;

  setForm(prev => ({ ...prev, [field]: value }));
  setErrors(prev => ({ ...prev, [field]: '' }));
};


const handleSignup = async () => {
  const newErrors: any = {};

  // Full Name Validation
  const nameTrimmed = form.fullName.trim();
  if (!nameTrimmed) {
    newErrors.fullName = 'Full name is required';
  } else if (!/^[A-Za-z ]+$/.test(nameTrimmed)) {
    newErrors.fullName = 'Name can contain only letters and spaces';
  } else if (nameTrimmed.length < 2) {
    newErrors.fullName = 'Name must be at least 2 characters';
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!emailRegex.test(form.email)) {
    newErrors.email = 'Invalid email format';
  }

  // Password Validation
  const password = form.password;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/;
  if (!password) {
    newErrors.password = 'Password is required';
  } else if (!passwordRegex.test(password)) {
    newErrors.password =
      'Password must be at least 6 characters, include uppercase, lowercase, number, and special character';
  }

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

    await updateProfile(userCredential.user, {
      displayName: nameTrimmed,
    });
     localStorage.setItem('fullName', nameTrimmed);
    toast.success('Signup successful!');
    router.push('/');
  } catch (error: any) {
    toast.error(error?.message || 'Signup failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme === 'dark' ? '' : ''}`}>
      {!loading ? (
        <div className={`shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden ${theme === 'dark' ? 'bg-dark-color' : 'bg-light-color'}`}>
          {/* Left Image Panel */}
          <div className="hidden md:flex justify-center items-center w-1/2 p-8">
            <Image src={Images.SearchIcon} alt="Illustration" width={300} height={300} />
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 p-8 pt-4">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
                <p className="text-sm mb-6">Please sign up to continue</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={toggleTheme}
                  checked={theme === 'dark'}
                />
                <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
                  <div
                    className={`absolute top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 transform peer-checked:translate-x-6 ${theme === 'dark' ? 'left-[50%]' : 'left-[1%]'}`}
                  />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 mt-1">
                  {theme === 'light' ? <Sun size={20} color="black" /> : <Moon size={20} color="white" />}
                </span>
              </label>
            </div>

            {/* Full Name Input */}
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`w-full px-4 py-3 mb-2 border rounded-md placeholder-gray-500 dark:placeholder-gray-300
                focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
                }`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mb-3">{errors.fullName}</p>}

            {/* Email Input */}
            <input
              type="text"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 mb-2 border rounded-md placeholder-gray-500 dark:placeholder-gray-300
                focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create Password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full px-4 py-3 pr-12 mb-2 border rounded-md placeholder-gray-500 dark:placeholder-gray-300
                  focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mb-3">{errors.password}</p>}

            {/* Submit Button */}
            <button
              onClick={handleSignup}
              className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SignUp;
