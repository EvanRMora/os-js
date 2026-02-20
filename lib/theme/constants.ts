export const THEMES = ['retro', 'modern', 'fallout'] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = 'retro';
export const THEME_STORAGE_KEY = 'os-theme';
