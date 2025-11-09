
export enum Tone {
  Professional = 'Professional',
  Witty = 'Witty',
  Urgent = 'Urgent',
  Inspirational = 'Inspirational',
  Casual = 'Casual'
}

export enum Platform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
}

export interface GeneratedPost {
  platform: Platform;
  text: string;
  imageUrl: string;
  aspectRatio: '16:9' | '1:1';
}

export interface SocialMediaContentResponse {
  linkedin: string;
  twitter: string;
  instagram: string;
  imagePrompt: string;
}
