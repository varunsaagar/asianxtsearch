// components/UserProfile.tsx

import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';


interface UserProfileProps {
  email: string;
  picture: string;
  name: string;
}

export default function UserProfile({ email, picture, name }: UserProfileProps) {
    const navigate = useNavigate();
    const { setUser } = useUser();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    };
  
    return (
      <div className="mt-4 flex items-center gap-3 p-2 rounded-lg bg-[#2D3135] cursor-pointer">
        <img
          src={picture}
          alt={name}
          className="w-8 h-8 rounded-full"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1">
          <p className="text-white text-sm font-medium">{name}</p>
          <p className="text-gray-400 text-xs">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-[#363A3F] rounded-lg transition-colors"
        >
          <LogOut size={16} className="text-gray-400" />
        </button>
      </div>
    );
  }