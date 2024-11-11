// src/components/HamburgerMenu.tsx
import React from 'react';
import { Menu, X } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button 
      onClick={() => setIsOpen(!isOpen)} 
      className="fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-gray-600" />
      ) : (
        <Menu className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
};

export default HamburgerMenu;
