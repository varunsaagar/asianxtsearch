import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Apple, Chrome } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function Login() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google response:', credentialResponse);
      const response = await fetch('http://localhost:8000/api/v1/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Authentication failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      setUser(data.user);  // Update user context
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Authentication failed. Please try again.');
    }
  };

  

  const handleGoogleError = () => {
    setError('Google sign-in failed. Please try again.');
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#1A1D21] p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome to asianer news pro
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in or sign up to continue
        </p>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log('Login Failed');
                setError('Google sign-in failed. Please try again.');
              }}
              useOneTap
              auto_select={false}
              theme="filled_black"
              text="continue_with"
              shape="rectangular"
              width="300"
            />
          </div>

          <button className="w-full bg-black text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
            <Apple size={20} />
            Continue with Apple
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1A1D21] text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2D3135] text-white rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[#00A3A3]"
            />
          </div>

          <button className="w-full bg-[#00A3A3] text-white rounded-lg py-3 px-4 font-medium hover:bg-[#00B3B3] transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
