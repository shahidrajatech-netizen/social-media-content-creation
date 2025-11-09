
import React from 'react';
import { Tone } from '../types';

interface InputFormProps {
  idea: string;
  setIdea: (idea: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>
);


export const InputForm: React.FC<InputFormProps> = ({ idea, setIdea, tone, setTone, onGenerate, isLoading }) => {
  const tones = Object.values(Tone);

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-gray-300 mb-2">
            Your Content Idea
          </label>
          <textarea
            id="idea"
            rows={4}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            placeholder="e.g., Launching a new productivity app that helps users focus..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select a Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out
                  ${tone === t 
                    ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <WandIcon className="w-5 h-5" />
              Generate Content
            </>
          )}
        </button>
      </div>
    </div>
  );
};
