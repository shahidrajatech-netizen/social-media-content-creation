
import React, { useState } from 'react';
import { GeneratedPost, Platform } from '../types';

interface PlatformCardProps {
  post: GeneratedPost;
}

const PlatformIcon: React.FC<{ platform: Platform; className?: string }> = ({ platform, className }) => {
  switch (platform) {
    case Platform.LinkedIn:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case Platform.Twitter:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case Platform.Instagram:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
      );
    default:
      return null;
  }
};

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);


export const PlatformCard: React.FC<PlatformCardProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aspectClass = post.aspectRatio === '1:1' ? 'aspect-square' : 'aspect-video';

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-transform transform hover:-translate-y-1">
      <div className="p-4 flex items-center justify-between bg-gray-900/30">
        <div className="flex items-center gap-3">
          <PlatformIcon platform={post.platform} className="w-6 h-6 text-gray-300" />
          <h3 className="font-bold text-lg text-white">{post.platform}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-400" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              Copy Text
            </>
          )}
        </button>
      </div>
      
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={`Generated for ${post.platform}`}
          className={`w-full object-cover ${aspectClass}`}
        />
      ) : (
        <div className={`w-full bg-gray-700 flex items-center justify-center ${aspectClass}`}>
          <p className="text-gray-500">Image not available</p>
        </div>
      )}
      
      <div className="p-4 flex-grow">
        <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{post.text}</p>
      </div>
    </div>
  );
};
