// Asset management types

export interface GameAssets {
  // Tier 1: Always available (app-provided)
  icon: string;
  colorScheme: ColorPalette;

  // Tier 2: Sourced externally (BGG, press kits)
  boxArt?: string;
  boxArtThumbnail?: string;
  componentPhotos?: ComponentPhoto[];

  // Tier 3: User-provided
  userPhotos?: UserPhoto[];

  // Tier 4: Licensed (future)
  officialPack?: OfficialAssetPack;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface ComponentPhoto {
  id: string;
  type: ComponentType;
  label: string;
  uri: string;
  source: 'bundled' | 'bgg' | 'presskit' | 'user';
  attribution?: string;
}

export type ComponentType =
  | 'board'
  | 'card'
  | 'token'
  | 'die'
  | 'meeple'
  | 'tile'
  | 'resource'
  | 'scoreboard'
  | 'other';

export interface UserPhoto {
  id: string;
  componentType: ComponentType;
  label: string;
  localUri: string;
  createdAt: Date;
}

export interface OfficialAssetPack {
  publisher: string;
  version: string;
  downloadedAt?: Date;
  assets: {
    cards?: CardAsset[];
    tokens?: TokenAsset[];
    boards?: BoardAsset[];
    rulebook?: string;
  };
  license: LicenseInfo;
}

export interface CardAsset {
  id: string;
  name: string;
  frontUri: string;
  backUri?: string;
  category?: string;
}

export interface TokenAsset {
  id: string;
  name: string;
  uri: string;
  value?: number | string;
}

export interface BoardAsset {
  id: string;
  name: string;
  uri: string;
  type: 'main' | 'player' | 'extension';
}

export interface LicenseInfo {
  type: 'official' | 'presskit' | 'fan';
  attributionRequired: boolean;
  attributionText?: string;
  commercialUse: boolean;
  expiresAt?: Date;
}

// BGG API response types
export interface BGGGameInfo {
  id: number;
  name: string;
  thumbnail: string;
  image: string;
  description: string;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  minPlayTime: number;
  maxPlayTime: number;
  averageWeight: number;
}
