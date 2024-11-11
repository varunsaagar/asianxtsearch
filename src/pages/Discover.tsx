import React, { useState } from 'react';
import { Star, Cpu, Wallet2, Palette, Trophy, Clapperboard } from 'lucide-react';

const categories = [
  { id: 'top', icon: <Star size={16} />, label: 'Top' },
  { id: 'tech', icon: <Cpu size={16} />, label: 'Tech & Science' },
  { id: 'finance', icon: <Wallet2 size={16} />, label: 'Finance' },
  { id: 'arts', icon: <Palette size={16} />, label: 'Arts & Culture' },
  { id: 'sports', icon: <Trophy size={16} />, label: 'Sports' },
  { id: 'entertainment', icon: <Clapperboard size={16} />, label: 'Entertainment' },
];

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'The Oregon Trail Movie',
    excerpt: 'Apple is in the early stages of developing an action-comedy film adaptation of the classic educational game "The Oregon Trail," directed by Will Speck and Josh Gordon...',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'elymc'
  },
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState('top');

  return (
    <div className="flex-1 w-full min-h-screen pt-16 lg:pt-0">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium">Discover</h1>
          <div className="w-full sm:w-auto bg-[#1E2327] rounded-lg p-3 sm:p-4">
            <h3 className="text-white font-medium text-sm sm:text-base mb-1 sm:mb-2">Make it yours</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-3">
              Select topics and interests to customize your Discover experience
            </p>
            <button className="w-full bg-[#00A3A3] text-white rounded-lg py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-[#00B3B3] transition-colors">
              Save Interests
            </button>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#2D3135] scrollbar-track-[#1A1D21] -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 text-sm ${
                selectedCategory === category.id
                  ? 'bg-[#2D3135] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:gap-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-[#1E2327] rounded-lg sm:rounded-xl overflow-hidden hover:bg-[#252A2E] transition-colors"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="sm:flex-1 p-3 sm:p-6">
                  <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-600" />
                    <span className="text-gray-400 text-xs sm:text-sm">{article.author}</span>
                  </div>
                </div>
                <div className="relative w-full sm:w-64 h-48 sm:h-auto sm:aspect-square">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}