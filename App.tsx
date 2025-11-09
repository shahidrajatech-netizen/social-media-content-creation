
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateSocialMediaContent, generateImageForPlatform } from './services/geminiService';
import { Tone, GeneratedPost, Platform, SocialMediaContentResponse } from './types';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.Professional);
  const [generatedContent, setGeneratedContent] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!idea.trim()) {
      setError('Please enter an idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent([]);

    try {
      const textContent: SocialMediaContentResponse = await generateSocialMediaContent(idea, tone);
      
      const platforms: Platform[] = [Platform.LinkedIn, Platform.Twitter, Platform.Instagram];
      const platformData: { platform: Platform, text: string, aspectRatio: '16:9' | '1:1' }[] = [
        { platform: Platform.LinkedIn, text: textContent.linkedin, aspectRatio: '16:9' },
        { platform: Platform.Twitter, text: textContent.twitter, aspectRatio: '16:9' },
        { platform: Platform.Instagram, text: textContent.instagram, aspectRatio: '1:1' },
      ];

      const imagePromises = platformData.map(p => 
        generateImageForPlatform(textContent.imagePrompt, p.aspectRatio)
      );
      
      const images = await Promise.all(imagePromises);

      const finalContent: GeneratedPost[] = platformData.map((p, index) => ({
        platform: p.platform,
        text: p.text,
        imageUrl: images[index],
        aspectRatio: p.aspectRatio,
      }));
      
      setGeneratedContent(finalContent);

    } catch (err) {
      console.error(err);
      setError('An error occurred while generating content. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [idea, tone]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8">
          <InputForm
            idea={idea}
            setIdea={setIdea}
            tone={tone}
            setTone={setTone}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <ResultsDisplay
            posts={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
