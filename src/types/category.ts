export type CategoryId = 'general' | 'nature' | 'bakery' | 'astral' | 'animals';

export interface CategoryInfo {
  id: CategoryId;
  iconName: string; // 'Grid', 'Leaf', 'Coffee', 'Sparkles', 'HeartHandshake'
  themeColor: string; // e.g. 'bg-cozy-tile', 'bg-emerald-100', etc.
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'general', iconName: 'Grid', themeColor: 'bg-cozy-tile' },
  { id: 'nature', iconName: 'Leaf', themeColor: 'bg-emerald-100' },
  { id: 'bakery', iconName: 'Coffee', themeColor: 'bg-amber-100' },
  { id: 'astral', iconName: 'Sparkles', themeColor: 'bg-indigo-100' },
  { id: 'animals', iconName: 'HeartHandshake', themeColor: 'bg-orange-100' },
];
