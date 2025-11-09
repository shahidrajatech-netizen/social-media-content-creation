
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.93 2.13a2.44 2.44 0 0 1 4.14 0l.33 1a2.44 2.44 0 0 0 2.3 1.59h1.1a2.44 2.44 0 0 1 1.73 4.16l-.82.83a2.44 2.44 0 0 0 0 3.46l.82.83a2.44 2.44 0 0 1-1.73 4.16h-1.1a2.44 2.44 0 0 0-2.3 1.59l-.33 1a2.44 2.44 0 0 1-4.14 0l-.33-1a2.44 2.44 0 0 0-2.3-1.59h-1.1a2.44 2.44 0 0 1-1.73-4.16l.82-.83a2.44 2.44 0 0 0 0-3.46l-.82-.83A2.44 2.44 0 0 1 4.5 4.72h1.1a2.44 2.44 0 0 0 2.3-1.59Z" />
    <path d="M12 8v8" />
    <path d="M8.5 10.5 12 12l3.5-1.5" />
    <path d="M8.5 13.5 12 15l3.5-1.5" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <SparklesIcon className="text-purple-400 w-8 h-8" />
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          AI Social Content Generator
        </h1>
      </div>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Turn one idea into tailored posts for LinkedIn, Twitter/X, and Instagram, complete with platform-perfect images.
      </p>
    </header>
  );
};
