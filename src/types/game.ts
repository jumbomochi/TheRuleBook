// Core game definition types

import { GameAssets } from './assets';

export interface Game {
  id: string;
  name: string;
  bggId?: number;
  publisher?: string;
  playerCount: {
    min: number;
    max: number;
  };
  playTime: {
    min: number;
    max: number;
  };
  complexity: number; // 1-5 scale (BGG weight)
  categories: string[];
  mechanics: string[];

  // Rule content
  rules: RuleSection[];
  quickReference: QuickRefCard[];
  faq: FAQItem[];
  turnStructure?: TurnPhase[];

  // Companion configuration
  scoring: ScoringConfig;
  resources?: ResourceConfig[];
  phases?: GamePhase[];
  variants?: GameVariant[];
  expansions?: GameExpansion[];

  // Asset references
  assets: GameAssets;
}

export interface GamePhase {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface GameVariant {
  id: string;
  name: string;
  description?: string;
}

export interface GameExpansion {
  id: string;
  name: string;
  description?: string;
}

export interface RuleSection {
  id: string;
  title: string;
  content: string; // Markdown content
  order: number;
  level?: number;
  subsections?: RuleSection[];
  tags?: string[];
  examples?: string[];
}

export interface QuickRefCard {
  id: string;
  title: string;
  content?: string;
  category: string;
  icon?: string;
  items: Array<{
    label?: string;
    value: string;
    description?: string;
  }>;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  source?: string; // BGG, rulebook, etc.
  relatedRules?: string[];
}

export interface TurnPhase {
  id: string;
  name: string;
  description: string;
  order: number;
  optional?: boolean;
  actions?: string[];
}

export interface ScoringConfig {
  categories: ScoringCategory[];
  finalScoringOnly?: boolean; // Some games only score at end
  trackDuringGame?: boolean;
}

export interface ScoringCategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  maxValue?: number;
  minValue?: number;
  step?: number; // Increment/decrement step (default 1)
  description?: string;
}

export interface ResourceConfig {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  startingValue?: number;
  max?: number;
  min?: number;
  perPlayer?: boolean;
  shared?: boolean;
}
