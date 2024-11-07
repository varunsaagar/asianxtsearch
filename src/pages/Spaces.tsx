import React from 'react';
import { Upload, Brain, Users, Plus } from 'lucide-react';

const features = [
  {
    icon: <Upload className="text-blue-400" size={20} />,
    title: 'Upload Files',
    description: 'Upload your documents and Asianet News Pro will answer detailed questions'
  },
  {
    icon: <Brain className="text-purple-400" size={20} />,
    title: 'Set AI Instructions',
    description: 'Convert complex material into easy-to-understand formats like FAQs or Briefing Docs'
  },
  {
    icon: <Users className="text-green-400" size={20} />,
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
    <div className="flex-1 w-full min-h-screen pt-16 lg:pt-0">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium">My Spaces</h1>
          <button className="w-full sm:w-auto bg-[#00A3A3] hover:bg-[#00B3B3] text-white rounded-lg px-4 py-2 flex items-center justify-center gap-1.5 transition-colors text-sm sm:text-base">
            <Plus size={18} />
            Create Space
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#2D3135] rounded-lg sm:rounded-xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1A1D21] flex items-center justify-center mb-3 sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white font-medium text-base sm:text-lg mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-white text-xl sm:text-2xl font-medium mb-4">Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {examples.map((example, index) => (
            <button key={index} className="bg-[#2D3135] hover:bg-[#363A3F] rounded-lg sm:rounded-xl p-4 sm:p-6 text-left transition-colors w-full">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl">{example.emoji}</span>
                <div>
                  <h3 className="text-white font-medium text-sm sm:text-base mb-1">{example.title}</h3>
                  <span className="text-gray-400 text-xs sm:text-sm">{example.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 bg-[#2D3135] rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-white text-xl sm:text-2xl font-medium mb-2 sm:mb-4">Ready to get started?</h2>
            <p className="text-gray-400 text-sm mb-4 sm:mb-6">
              Create your first Space and start organizing your research, documents, and insights.
            </p>
            <button className="w-full sm:w-auto bg-[#00A3A3] hover:bg-[#00B3B3] text-white rounded-lg px-6 py-2.5 font-medium transition-colors text-sm sm:text-base">
              Create Your First Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}