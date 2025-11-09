
import React from 'react';
import { PlatformCard } from './PlatformCard';
import { GeneratedPost } from '../types';

interface ResultsDisplayProps {
  posts: GeneratedPost[];
  isLoading: boolean;
  error: string | null;
}

const SkeletonCard: React.FC = () => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
    </div>
    <div className="w-full bg-gray-700 rounded-lg aspect-[16/9] mb-4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-700 rounded"></div>
      <div className="h-3 bg-gray-700 rounded w-5/6"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      <div className="h-3 bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ posts, isLoading, error }) => {
  if (error) {
    return (
      <div className="mt-8 text-center bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
        <p className="font-semibold">Oops! Something went wrong.</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show anything if there are no posts and not loading
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Generated Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PlatformCard key={post.platform} post={post} />
        ))}
      </div>
    </div>
  );
};
