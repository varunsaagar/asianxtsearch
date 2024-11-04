import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/chat', { state: { initialQuery: query } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anything..."
          className="w-full bg-[#2D3135] text-white rounded-xl py-4 pl-12 pr-24 outline-none"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search size={20} className="text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00A3A3] text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#00B3B3] transition-colors"
        >
          <span>Search</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </form>
  );
}