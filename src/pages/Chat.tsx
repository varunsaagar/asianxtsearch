import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';

interface Source {
  number: number;
  url: string;
  title: string;
  text: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

const floatingDotsAnimation = `
  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
`;

// Add this new component for the loading animation
const LoadingAnimation = () => (
  <div className="flex items-center gap-2 p-4">
    <style>{floatingDotsAnimation}</style>
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full bg-cyan-400"
        style={{
          animation: 'floating 1s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}
  </div>
);


const extractDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch {
    return url;
  }
};

const formatDate = (url: string) => {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const datePattern = /\d{4}\/\d{2}\/\d{2}/;
    const dateSegment = pathSegments.find(segment => datePattern.test(segment));
    
    if (dateSegment) {
      const [year, month, day] = dateSegment.split('/');
      return new Date(`${year}-${month}-${day}`).toLocaleDateString();
    }
    return '';
  } catch {
    return '';
  }
};


export default function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const sourcesRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (sourcesRef.current) {
      const sourcesContainer = sourcesRef.current;
      const sources = sourcesContainer.querySelectorAll('.source-item'); 

      if (sources.length > 2) {
        // Make the container scrollable if there are more than 2 sources
        sourcesContainer.style.overflowY = 'auto'; 
        sourcesContainer.style.maxHeight = '300px'; // Set a max height for the scrollable area
      }
    }
  }, [messages]); 

  useEffect(() => {
    const initialQuery = location.state?.initialQuery;
    if (initialQuery) {
      handleInitialQuery(initialQuery);
    }
  }, [location.state]);

  const formatSources = (citations: any[]) => {
    return citations.map((citation, index) => ({
      number: index + 1,
      url: citation.url,
      title: citation.title || `Source ${index + 1}`,
      text: citation.text || ''
    }));
  };

  const handleInitialQuery = async (query: string) => {
    try {
      setLoading(true);
      const response = await api.generate({ query });
      
      setConversationId(response.conversation_id);
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: query
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.answer,
        sources: formatSources(response.citations)
      };

      setMessages([userMessage, aiMessage]);
    } catch (error) {
      console.error('Error handling initial query:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    try {
      setLoading(true);
      const response = await api.generate(
        { query: inputValue },
        conversationId
      );

      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: inputValue
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.answer,
        sources: formatSources(response.citations)
      };

      setMessages([...messages, userMessage, aiMessage]);
      setInputValue('');
      setConversationId(response.conversation_id);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSources = (sources: Source[]) => {
    if (!sources || sources.length === 0) return null;

    return (
      <div className="mt-4 space-y-2" ref={sourcesRef}> {/* Add the ref here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source, index) => (
            <div 
              key={index} 
              className="bg-[#2D3135] rounded-lg p-4 hover:bg-[#363A3F] transition-colors source-item" 
            
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1A1D21] flex items-center justify-center text-sm text-gray-400 flex-shrink-0">
                  {source.number}
                </div>
                <div className="flex-1 min-w-0">
                  {/* URL */}
                  <a 
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 truncate block mb-2"
                  >
                    {source.url}
                  </a>
                  
                  {/* Source Text */}
                  <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                    {source.text}
                  </p>
                  
                  {/* Read More Link */}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Read more
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex-1 flex flex-col h-screen bg-[#1A1D21]">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-4xl mx-auto ${
              message.type === 'user' ? 'text-white' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#2D3135] flex items-center justify-center">
                {message.type === 'user' ? (
                  'U'
                ) : (
                  <MessageSquare size={16} className="text-cyan-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-white whitespace-pre-wrap">
                  {message.content}
                </div>
                {message.sources && renderSources(message.sources)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add loading animation when waiting for response */}
        {loading && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#2D3135] flex items-center justify-center">
                <MessageSquare size={16} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="bg-[#2D3135] rounded-lg p-2 inline-block">
                  <LoadingAnimation />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  
      {/* Input Form */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="w-full bg-[#2D3135] text-white rounded-xl py-4 px-6 pr-24 outline-none focus:ring-2 focus:ring-cyan-400/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00A3A3] text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#00B3B3] transition-colors disabled:opacity-50"
            >
              <span>{loading ? 'Thinking...' : 'Send'}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

