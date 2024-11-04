import React, { useState } from 'react';
import { Star, Cpu, Wallet2, Palette, Trophy, Clapperboard } from 'lucide-react';

const categories = [
  { id: 'top', icon: <Star size={18} />, label: 'Top' },
  { id: 'tech', icon: <Cpu size={18} />, label: 'Tech & Science' },
  { id: 'finance', icon: <Wallet2 size={18} />, label: 'Finance' },
  { id: 'arts', icon: <Palette size={18} />, label: 'Arts & Culture' },
  { id: 'sports', icon: <Trophy size={18} />, label: 'Sports' },
  { id: 'entertainment', icon: <Clapperboard size={18} />, label: 'Entertainment' },
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
  // Add more articles as needed
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState('top');

  return (
    <div className="flex-1 max-w-6xl mx-auto px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-4xl font-medium">Discover</h1>
        <div className="bg-[#1E2327] rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Make it yours</h3>
          <p className="text-gray-400 text-sm mb-4">
            Select topics and interests to customize your Discover experience
          </p>
          <button className="w-full bg-[#00A3A3] text-white rounded-lg py-2 text-sm font-medium">
            Save Interests
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
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

      <div className="grid gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-[#1E2327] rounded-xl p-6 hover:bg-[#252A2E] transition-colors"
          >
            <div className="flex gap-6">
              <div className="flex-1">
                <h2 className="text-white text-xl font-medium mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-600" />
                  <span className="text-gray-400 text-sm">{article.author}</span>
                </div>
              </div>
              <img
                src={article.image}
                alt={article.title}
                className="w-64 h-40 object-cover rounded-lg"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}