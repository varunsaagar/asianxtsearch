import React from 'react';
import { Upload, Brain, Users, Plus, Book, Lightbulb, HelpCircle } from 'lucide-react';

const features = [
  {
    icon: <Upload className="text-blue-400" size={24} />,
    title: 'Upload Files',
    description: 'Upload your documents and Asianet News Pro will answer detailed questions'
  },
  {
    icon: <Brain className="text-purple-400" size={24} />,
    title: 'Set AI Instructions',
    description: 'Convert complex material into easy-to-understand formats like FAQs or Briefing Docs'
  },
  {
    icon: <Users className="text-green-400" size={24} />,
    title: 'Collaborate with others',
    description: 'Add resources to a Space and share it to create a group knowledge base'
  }
];

const examples = [
  {
    emoji: '📔',
    title: 'The Art of War Review',
    time: '6m'
  },
  {
    emoji: '🧠',
    title: 'Brainstorm Buddy',
    time: '6m'
  },
  {
    emoji: '⁉️',
    title: 'Questions to Claude',
    time: '6m'
  }
];

export default function Spaces() {
  return (
    <div className="flex-1 max-w-6xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-4xl font-medium">My Spaces</h1>
        <button className="bg-[#00A3A3] hover:bg-[#00B3B3] text-white rounded-lg px-6 py-2.5 flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Create Space
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#2D3135] rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-[#1A1D21] flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-white font-medium text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-white text-2xl font-medium mb-6">Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <button key={index} className="bg-[#2D3135] hover:bg-[#363A3F] rounded-xl p-6 text-left transition-colors">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{example.emoji}</span>
              <div>
                <h3 className="text-white font-medium mb-1">{example.title}</h3>
                <span className="text-gray-400 text-sm">{example.time}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 bg-[#2D3135] rounded-xl p-8 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-white text-2xl font-medium mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-6">
            Create your first Space and start organizing your research, documents, and insights.
          </p>
          <button className="bg-[#00A3A3] hover:bg-[#00B3B3] text-white rounded-lg px-8 py-3 font-medium transition-colors">
            Create Your First Space
          </button>
        </div>
      </div>
    </div>
  );
}