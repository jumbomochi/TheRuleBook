/**
 * Asset utilities for accessing CC0 game assets
 * All assets are CC0 licensed - free to use without attribution
 */

// Gem assets (100 gems in 10 color sets, 10 variations each)
// File naming: {colorSet}_{variation}.png (e.g., 1_1.png, 1_2.png)
export const GEM_COLORS = {
  ruby: 1,      // Red gems
  sapphire: 2,  // Blue gems
  emerald: 3,   // Green gems
  amethyst: 4,  // Purple gems
  topaz: 5,     // Yellow/gold gems
  diamond: 6,   // White/clear gems
  onyx: 7,      // Dark gems
  aquamarine: 8, // Cyan gems
  rose: 9,      // Pink gems
  amber: 10,    // Orange gems
} as const;

export type GemColor = keyof typeof GEM_COLORS;

// Splendor gem color mapping
export const SPLENDOR_GEMS: Record<string, GemColor> = {
  diamond: 'diamond',
  sapphire: 'sapphire',
  emerald: 'emerald',
  ruby: 'ruby',
  onyx: 'onyx',
  gold: 'topaz',
};

export function getGemAsset(color: GemColor, variation: number = 1): any {
  const colorNum = GEM_COLORS[color];
  const v = Math.max(1, Math.min(10, variation));

  // Using require with template strings requires a switch or mapping
  const gems: Record<string, Record<number, any>> = {
    ruby: {
      1: require('../../assets/shared/gems/1_1.png'),
      2: require('../../assets/shared/gems/1_2.png'),
      3: require('../../assets/shared/gems/1_3.png'),
      4: require('../../assets/shared/gems/1_4.png'),
      5: require('../../assets/shared/gems/1_5.png'),
      6: require('../../assets/shared/gems/1_6.png'),
      7: require('../../assets/shared/gems/1_7.png'),
      8: require('../../assets/shared/gems/1_8.png'),
      9: require('../../assets/shared/gems/1_9.png'),
      10: require('../../assets/shared/gems/1_10.png'),
    },
    sapphire: {
      1: require('../../assets/shared/gems/2_1.png'),
      2: require('../../assets/shared/gems/2_2.png'),
      3: require('../../assets/shared/gems/2_3.png'),
      4: require('../../assets/shared/gems/2_4.png'),
      5: require('../../assets/shared/gems/2_5.png'),
      6: require('../../assets/shared/gems/2_6.png'),
      7: require('../../assets/shared/gems/2_7.png'),
      8: require('../../assets/shared/gems/2_8.png'),
      9: require('../../assets/shared/gems/2_9.png'),
      10: require('../../assets/shared/gems/2_10.png'),
    },
    emerald: {
      1: require('../../assets/shared/gems/3_1.png'),
      2: require('../../assets/shared/gems/3_2.png'),
      3: require('../../assets/shared/gems/3_3.png'),
      4: require('../../assets/shared/gems/3_4.png'),
      5: require('../../assets/shared/gems/3_5.png'),
      6: require('../../assets/shared/gems/3_6.png'),
      7: require('../../assets/shared/gems/3_7.png'),
      8: require('../../assets/shared/gems/3_8.png'),
      9: require('../../assets/shared/gems/3_9.png'),
      10: require('../../assets/shared/gems/3_10.png'),
    },
    amethyst: {
      1: require('../../assets/shared/gems/4_1.png'),
      2: require('../../assets/shared/gems/4_2.png'),
      3: require('../../assets/shared/gems/4_3.png'),
      4: require('../../assets/shared/gems/4_4.png'),
      5: require('../../assets/shared/gems/4_5.png'),
      6: require('../../assets/shared/gems/4_6.png'),
      7: require('../../assets/shared/gems/4_7.png'),
      8: require('../../assets/shared/gems/4_8.png'),
      9: require('../../assets/shared/gems/4_9.png'),
      10: require('../../assets/shared/gems/4_10.png'),
    },
    topaz: {
      1: require('../../assets/shared/gems/5_1.png'),
      2: require('../../assets/shared/gems/5_2.png'),
      3: require('../../assets/shared/gems/5_3.png'),
      4: require('../../assets/shared/gems/5_4.png'),
      5: require('../../assets/shared/gems/5_5.png'),
      6: require('../../assets/shared/gems/5_6.png'),
      7: require('../../assets/shared/gems/5_7.png'),
      8: require('../../assets/shared/gems/5_8.png'),
      9: require('../../assets/shared/gems/5_9.png'),
      10: require('../../assets/shared/gems/5_10.png'),
    },
    diamond: {
      1: require('../../assets/shared/gems/6_1.png'),
      2: require('../../assets/shared/gems/6_2.png'),
      3: require('../../assets/shared/gems/6_3.png'),
      4: require('../../assets/shared/gems/6_4.png'),
      5: require('../../assets/shared/gems/6_5.png'),
      6: require('../../assets/shared/gems/6_6.png'),
      7: require('../../assets/shared/gems/6_7.png'),
      8: require('../../assets/shared/gems/6_8.png'),
      9: require('../../assets/shared/gems/6_9.png'),
      10: require('../../assets/shared/gems/6_10.png'),
    },
    onyx: {
      1: require('../../assets/shared/gems/7_1.png'),
      2: require('../../assets/shared/gems/7_2.png'),
      3: require('../../assets/shared/gems/7_3.png'),
      4: require('../../assets/shared/gems/7_4.png'),
      5: require('../../assets/shared/gems/7_5.png'),
      6: require('../../assets/shared/gems/7_6.png'),
      7: require('../../assets/shared/gems/7_7.png'),
      8: require('../../assets/shared/gems/7_8.png'),
      9: require('../../assets/shared/gems/7_9.png'),
      10: require('../../assets/shared/gems/7_10.png'),
    },
    aquamarine: {
      1: require('../../assets/shared/gems/8_1.png'),
      2: require('../../assets/shared/gems/8_2.png'),
      3: require('../../assets/shared/gems/8_3.png'),
      4: require('../../assets/shared/gems/8_4.png'),
      5: require('../../assets/shared/gems/8_5.png'),
      6: require('../../assets/shared/gems/8_6.png'),
      7: require('../../assets/shared/gems/8_7.png'),
      8: require('../../assets/shared/gems/8_8.png'),
      9: require('../../assets/shared/gems/8_9.png'),
      10: require('../../assets/shared/gems/8_10.png'),
    },
    rose: {
      1: require('../../assets/shared/gems/9_1.png'),
      2: require('../../assets/shared/gems/9_2.png'),
      3: require('../../assets/shared/gems/9_3.png'),
      4: require('../../assets/shared/gems/9_4.png'),
      5: require('../../assets/shared/gems/9_5.png'),
      6: require('../../assets/shared/gems/9_6.png'),
      7: require('../../assets/shared/gems/9_7.png'),
      8: require('../../assets/shared/gems/9_8.png'),
      9: require('../../assets/shared/gems/9_9.png'),
      10: require('../../assets/shared/gems/9_10.png'),
    },
    amber: {
      1: require('../../assets/shared/gems/10_1.png'),
      2: require('../../assets/shared/gems/10_2.png'),
      3: require('../../assets/shared/gems/10_3.png'),
      4: require('../../assets/shared/gems/10_4.png'),
      5: require('../../assets/shared/gems/10_5.png'),
      6: require('../../assets/shared/gems/10_6.png'),
      7: require('../../assets/shared/gems/10_7.png'),
      8: require('../../assets/shared/gems/10_8.png'),
      9: require('../../assets/shared/gems/10_9.png'),
      10: require('../../assets/shared/gems/10_10.png'),
    },
  };

  return gems[color]?.[v] || gems.ruby[1];
}

// Get multiple random gems for decorative purposes
export function getRandomGems(count: number): Array<{ asset: any; color: GemColor }> {
  const colors = Object.keys(GEM_COLORS) as GemColor[];
  const result: Array<{ asset: any; color: GemColor }> = [];

  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const variation = Math.floor(Math.random() * 10) + 1;
    result.push({ asset: getGemAsset(color, variation), color });
  }

  return result;
}

// Planet types available
export const PLANET_TYPES = [
  'Airless', 'Aquamarine', 'Arid', 'Barren', 'BlueGiant', 'Cloudy',
  'Cratered', 'Dry', 'Frozen', 'Glacial', 'GreenGiant', 'Icy',
  'Lunar', 'Lush', 'Magma', 'Muddy', 'Oasis', 'Ocean',
  'OrgangeGiant', 'RedGiant', 'Rocky', 'Snowy', 'Sun_Blue',
  'Sun_Red', 'Sun_Yellow', 'Terrestrial', 'Tropical', 'YellowGiant',
] as const;

export type PlanetType = typeof PLANET_TYPES[number];

// Mars-like planet types for Terraforming Mars
export const MARS_PLANET_TYPES: PlanetType[] = [
  'Arid', 'Barren', 'Cratered', 'Dry', 'Rocky', 'RedGiant', 'Magma',
];

// Planets suitable for terraformed Mars
export const TERRAFORMED_PLANET_TYPES: PlanetType[] = [
  'Terrestrial', 'Lush', 'Ocean', 'Oasis', 'Tropical', 'Aquamarine',
];

export function getPlanetAsset(type: PlanetType, variation: number = 1): any {
  const v = Math.max(1, Math.min(5, variation));

  const planets: Record<PlanetType, Record<number, any>> = {
    Airless: {
      1: require('../../assets/shared/planets/Airless_01-256x256.png'),
      2: require('../../assets/shared/planets/Airless_02-256x256.png'),
      3: require('../../assets/shared/planets/Airless_03-256x256.png'),
      4: require('../../assets/shared/planets/Airless_04-256x256.png'),
      5: require('../../assets/shared/planets/Airless_05-256x256.png'),
    },
    Aquamarine: {
      1: require('../../assets/shared/planets/Aquamarine_01-256x256.png'),
      2: require('../../assets/shared/planets/Aquamarine_02-256x256.png'),
      3: require('../../assets/shared/planets/Aquamarine_03-256x256.png'),
      4: require('../../assets/shared/planets/Aquamarine_04-256x256.png'),
      5: require('../../assets/shared/planets/Aquamarine_05-256x256.png'),
    },
    Arid: {
      1: require('../../assets/shared/planets/Arid_01-256x256.png'),
      2: require('../../assets/shared/planets/Arid_02-256x256.png'),
      3: require('../../assets/shared/planets/Arid_03-256x256.png'),
      4: require('../../assets/shared/planets/Arid_04-256x256.png'),
      5: require('../../assets/shared/planets/Arid_05-256x256.png'),
    },
    Barren: {
      1: require('../../assets/shared/planets/Barren_01-256x256.png'),
      2: require('../../assets/shared/planets/Barren_02-256x256.png'),
      3: require('../../assets/shared/planets/Barren_03-256x256.png'),
      4: require('../../assets/shared/planets/Barren_04-256x256.png'),
      5: require('../../assets/shared/planets/Barren_05-256x256.png'),
    },
    BlueGiant: {
      1: require('../../assets/shared/planets/BlueGiant_01-256x256.png'),
      2: require('../../assets/shared/planets/BlueGiant_02-256x256.png'),
      3: require('../../assets/shared/planets/BlueGiant_03-256x256.png'),
      4: require('../../assets/shared/planets/BlueGiant_04-256x256.png'),
      5: require('../../assets/shared/planets/BlueGiant_05-256x256.png'),
    },
    Cloudy: {
      1: require('../../assets/shared/planets/Cloudy_01-256x256.png'),
      2: require('../../assets/shared/planets/Cloudy_02-256x256.png'),
      3: require('../../assets/shared/planets/Cloudy_03-256x256.png'),
      4: require('../../assets/shared/planets/Cloudy_04-256x256.png'),
      5: require('../../assets/shared/planets/Cloudy_05-256x256.png'),
    },
    Cratered: {
      1: require('../../assets/shared/planets/Cratered_01-256x256.png'),
      2: require('../../assets/shared/planets/Cratered_02-256x256.png'),
      3: require('../../assets/shared/planets/Cratered_03-256x256.png'),
      4: require('../../assets/shared/planets/Cratered_04-256x256.png'),
      5: require('../../assets/shared/planets/Cratered_05-256x256.png'),
    },
    Dry: {
      1: require('../../assets/shared/planets/Dry_01-256x256.png'),
      2: require('../../assets/shared/planets/Dry_02-256x256.png'),
      3: require('../../assets/shared/planets/Dry_03-256x256.png'),
      4: require('../../assets/shared/planets/Dry_04-256x256.png'),
      5: require('../../assets/shared/planets/Dry_05-256x256.png'),
    },
    Frozen: {
      1: require('../../assets/shared/planets/Frozen_01-256x256.png'),
      2: require('../../assets/shared/planets/Frozen_02-256x256.png'),
      3: require('../../assets/shared/planets/Frozen_03-256x256.png'),
      4: require('../../assets/shared/planets/Frozen_04-256x256.png'),
      5: require('../../assets/shared/planets/Frozen_05-256x256.png'),
    },
    Glacial: {
      1: require('../../assets/shared/planets/Glacial_01-256x256.png'),
      2: require('../../assets/shared/planets/Glacial_02-256x256.png'),
      3: require('../../assets/shared/planets/Glacial_03-256x256.png'),
      4: require('../../assets/shared/planets/Glacial_04-256x256.png'),
      5: require('../../assets/shared/planets/Glacial_05-256x256.png'),
    },
    GreenGiant: {
      1: require('../../assets/shared/planets/GreenGiant_01-256x256.png'),
      2: require('../../assets/shared/planets/GreenGiant_02-256x256.png'),
      3: require('../../assets/shared/planets/GreenGiant_03-256x256.png'),
      4: require('../../assets/shared/planets/GreenGiant_04-256x256.png'),
      5: require('../../assets/shared/planets/GreenGiant_05-256x256.png'),
    },
    Icy: {
      1: require('../../assets/shared/planets/Icy_01-256x256.png'),
      2: require('../../assets/shared/planets/Icy_02-256x256.png'),
      3: require('../../assets/shared/planets/Icy_03-256x256.png'),
      4: require('../../assets/shared/planets/Icy_04-256x256.png'),
      5: require('../../assets/shared/planets/Icy_05-256x256.png'),
    },
    Lunar: {
      1: require('../../assets/shared/planets/Lunar_01-256x256.png'),
      2: require('../../assets/shared/planets/Lunar_02-256x256.png'),
      3: require('../../assets/shared/planets/Lunar_03-256x256.png'),
      4: require('../../assets/shared/planets/Lunar_04-256x256.png'),
      5: require('../../assets/shared/planets/Lunar_05-256x256.png'),
    },
    Lush: {
      1: require('../../assets/shared/planets/Lush_01-256x256.png'),
      2: require('../../assets/shared/planets/Lush_02-256x256.png'),
      3: require('../../assets/shared/planets/Lush_03-256x256.png'),
      4: require('../../assets/shared/planets/Lush_04-256x256.png'),
      5: require('../../assets/shared/planets/Lush_05-256x256.png'),
    },
    Magma: {
      1: require('../../assets/shared/planets/Magma_01-256x256.png'),
      2: require('../../assets/shared/planets/Magma_02-256x256.png'),
      3: require('../../assets/shared/planets/Magma_03-256x256.png'),
      4: require('../../assets/shared/planets/Magma_04-256x256.png'),
      5: require('../../assets/shared/planets/Magma_05-256x256.png'),
    },
    Muddy: {
      1: require('../../assets/shared/planets/Muddy_01-256x256.png'),
      2: require('../../assets/shared/planets/Muddy_02-256x256.png'),
      3: require('../../assets/shared/planets/Muddy_03-256x256.png'),
      4: require('../../assets/shared/planets/Muddy_04-256x256.png'),
      5: require('../../assets/shared/planets/Muddy_05-256x256.png'),
    },
    Oasis: {
      1: require('../../assets/shared/planets/Oasis_01-256x256.png'),
      2: require('../../assets/shared/planets/Oasis_02-256x256.png'),
      3: require('../../assets/shared/planets/Oasis_03-256x256.png'),
      4: require('../../assets/shared/planets/Oasis_04-256x256.png'),
      5: require('../../assets/shared/planets/Oasis_05-256x256.png'),
    },
    Ocean: {
      1: require('../../assets/shared/planets/Ocean_01-256x256.png'),
      2: require('../../assets/shared/planets/Ocean_02-256x256.png'),
      3: require('../../assets/shared/planets/Ocean_03-256x256.png'),
      4: require('../../assets/shared/planets/Ocean_04-256x256.png'),
      5: require('../../assets/shared/planets/Ocean_05-256x256.png'),
    },
    OrgangeGiant: {
      1: require('../../assets/shared/planets/OrgangeGiant_01-256x256.png'),
      2: require('../../assets/shared/planets/OrgangeGiant_02-256x256.png'),
      3: require('../../assets/shared/planets/OrgangeGiant_03-256x256.png'),
      4: require('../../assets/shared/planets/OrgangeGiant_04-256x256.png'),
      5: require('../../assets/shared/planets/OrgangeGiant_05-256x256.png'),
    },
    RedGiant: {
      1: require('../../assets/shared/planets/RedGiant_01-256x256.png'),
      2: require('../../assets/shared/planets/RedGiant_02-256x256.png'),
      3: require('../../assets/shared/planets/RedGiant_03-256x256.png'),
      4: require('../../assets/shared/planets/RedGiant_04-256x256.png'),
      5: require('../../assets/shared/planets/RedGiant_05-256x256.png'),
    },
    Rocky: {
      1: require('../../assets/shared/planets/Rocky_01-256x256.png'),
      2: require('../../assets/shared/planets/Rocky_02-256x256.png'),
      3: require('../../assets/shared/planets/Rocky_03-256x256.png'),
      4: require('../../assets/shared/planets/Rocky_04-256x256.png'),
      5: require('../../assets/shared/planets/Rocky_05-256x256.png'),
    },
    Snowy: {
      1: require('../../assets/shared/planets/Snowy_01-256x256.png'),
      2: require('../../assets/shared/planets/Snowy_02-256x256.png'),
      3: require('../../assets/shared/planets/Snowy_03-256x256.png'),
      4: require('../../assets/shared/planets/Snowy_04-256x256.png'),
      5: require('../../assets/shared/planets/Snowy_05-256x256.png'),
    },
    Sun_Blue: {
      1: require('../../assets/shared/planets/Sun_Blue_01-256x256.png'),
      2: require('../../assets/shared/planets/Sun_Blue_02-256x256.png'),
      3: require('../../assets/shared/planets/Sun_Blue_03-256x256.png'),
      4: require('../../assets/shared/planets/Sun_Blue_04-256x256.png'),
      5: require('../../assets/shared/planets/Sun_Blue_05-256x256.png'),
    },
    Sun_Red: {
      1: require('../../assets/shared/planets/Sun_Red_01-256x256.png'),
      2: require('../../assets/shared/planets/Sun_Red_02-256x256.png'),
      3: require('../../assets/shared/planets/Sun_Red_03-256x256.png'),
      4: require('../../assets/shared/planets/Sun_Red_04-256x256.png'),
      5: require('../../assets/shared/planets/Sun_Red_05-256x256.png'),
    },
    Sun_Yellow: {
      1: require('../../assets/shared/planets/Sun_Yellow_01-256x256.png'),
      2: require('../../assets/shared/planets/Sun_Yellow_02-256x256.png'),
      3: require('../../assets/shared/planets/Sun_Yellow_03-256x256.png'),
      4: require('../../assets/shared/planets/Sun_Yellow_04-256x256.png'),
      5: require('../../assets/shared/planets/Sun_Yellow_05-256x256.png'),
    },
    Terrestrial: {
      1: require('../../assets/shared/planets/Terrestrial_01-256x256.png'),
      2: require('../../assets/shared/planets/Terrestrial_02-256x256.png'),
      3: require('../../assets/shared/planets/Terrestrial_03-256x256.png'),
      4: require('../../assets/shared/planets/Terrestrial_04-256x256.png'),
      5: require('../../assets/shared/planets/Terrestrial_05-256x256.png'),
    },
    Tropical: {
      1: require('../../assets/shared/planets/Tropical_01-256x256.png'),
      2: require('../../assets/shared/planets/Tropical_02-256x256.png'),
      3: require('../../assets/shared/planets/Tropical_03-256x256.png'),
      4: require('../../assets/shared/planets/Tropical_04-256x256.png'),
      5: require('../../assets/shared/planets/Tropical_05-256x256.png'),
    },
    YellowGiant: {
      1: require('../../assets/shared/planets/YellowGiant_01-256x256.png'),
      2: require('../../assets/shared/planets/YellowGiant_02-256x256.png'),
      3: require('../../assets/shared/planets/YellowGiant_03-256x256.png'),
      4: require('../../assets/shared/planets/YellowGiant_04-256x256.png'),
      5: require('../../assets/shared/planets/YellowGiant_05-256x256.png'),
    },
  };

  return planets[type]?.[v] || planets.Arid[1];
}

// Get a Mars-like planet for Terraforming Mars
export function getMarsPlanet(variation: number = 1): any {
  const types = MARS_PLANET_TYPES;
  const type = types[Math.floor(Math.random() * types.length)];
  return getPlanetAsset(type, variation);
}

// Board game icons - commonly used ones
export const BOARD_GAME_ICONS = {
  // Dice
  dice: require('../../assets/shared/icons/PNG/Default (64px)/dice.png'),
  dice1: require('../../assets/shared/icons/PNG/Default (64px)/dice_1.png'),
  dice2: require('../../assets/shared/icons/PNG/Default (64px)/dice_2.png'),
  dice3: require('../../assets/shared/icons/PNG/Default (64px)/dice_3.png'),
  dice4: require('../../assets/shared/icons/PNG/Default (64px)/dice_4.png'),
  dice5: require('../../assets/shared/icons/PNG/Default (64px)/dice_5.png'),
  dice6: require('../../assets/shared/icons/PNG/Default (64px)/dice_6.png'),

  // Cards
  card: require('../../assets/shared/icons/PNG/Default (64px)/card.png'),
  cards: require('../../assets/shared/icons/PNG/Default (64px)/cards_stack.png'),
  cardsFan: require('../../assets/shared/icons/PNG/Default (64px)/cards_fan.png'),

  // Pawns & Tokens
  pawn: require('../../assets/shared/icons/PNG/Default (64px)/pawn.png'),
  pawns: require('../../assets/shared/icons/PNG/Default (64px)/pawns.png'),
  token: require('../../assets/shared/icons/PNG/Default (64px)/token.png'),
  tokens: require('../../assets/shared/icons/PNG/Default (64px)/tokens.png'),

  // Resources
  resourceApple: require('../../assets/shared/icons/PNG/Default (64px)/resource_apple.png'),
  resourceWheat: require('../../assets/shared/icons/PNG/Default (64px)/resource_wheat.png'),
  resourceWood: require('../../assets/shared/icons/PNG/Default (64px)/resource_wood.png'),
  resourceIron: require('../../assets/shared/icons/PNG/Default (64px)/resource_iron.png'),

  // Actions
  award: require('../../assets/shared/icons/PNG/Default (64px)/award.png'),
  crown: require('../../assets/shared/icons/PNG/Default (64px)/crown_a.png'),
  shield: require('../../assets/shared/icons/PNG/Default (64px)/shield.png'),

  // Books & Rules
  bookOpen: require('../../assets/shared/icons/PNG/Default (64px)/book_open.png'),
  bookClosed: require('../../assets/shared/icons/PNG/Default (64px)/book_closed.png'),

  // Timer
  hourglass: require('../../assets/shared/icons/PNG/Default (64px)/hourglass.png'),
  timer: require('../../assets/shared/icons/PNG/Default (64px)/timer_100.png'),

  // Numbers (tags)
  tag1: require('../../assets/shared/icons/PNG/Default (64px)/tag_1.png'),
  tag2: require('../../assets/shared/icons/PNG/Default (64px)/tag_2.png'),
  tag3: require('../../assets/shared/icons/PNG/Default (64px)/tag_3.png'),
  tag4: require('../../assets/shared/icons/PNG/Default (64px)/tag_4.png'),
  tag5: require('../../assets/shared/icons/PNG/Default (64px)/tag_5.png'),

  // Hexagons (for board games)
  hexagon: require('../../assets/shared/icons/PNG/Default (64px)/hexagon.png'),
  hexagonOutline: require('../../assets/shared/icons/PNG/Default (64px)/hexagon_outline.png'),

  // Misc
  fire: require('../../assets/shared/icons/PNG/Default (64px)/fire.png'),
  flag: require('../../assets/shared/icons/PNG/Default (64px)/flag_triangle.png'),
  puzzle: require('../../assets/shared/icons/PNG/Default (64px)/puzzle.png'),
} as const;

// UI elements by color
export const UI_ELEMENTS = {
  blue: {
    button: require('../../assets/shared/ui/PNG/Blue/Default/button_rectangle_depth_flat.png'),
    buttonBorder: require('../../assets/shared/ui/PNG/Blue/Default/button_rectangle_border.png'),
  },
  green: {
    button: require('../../assets/shared/ui/PNG/Green/Default/button_rectangle_depth_flat.png'),
    buttonBorder: require('../../assets/shared/ui/PNG/Green/Default/button_rectangle_border.png'),
  },
  grey: {
    button: require('../../assets/shared/ui/PNG/Grey/Default/button_rectangle_depth_flat.png'),
    buttonBorder: require('../../assets/shared/ui/PNG/Grey/Default/button_rectangle_border.png'),
  },
  red: {
    button: require('../../assets/shared/ui/PNG/Red/Default/button_rectangle_depth_flat.png'),
    buttonBorder: require('../../assets/shared/ui/PNG/Red/Default/button_rectangle_border.png'),
  },
  yellow: {
    button: require('../../assets/shared/ui/PNG/Yellow/Default/button_rectangle_depth_flat.png'),
    buttonBorder: require('../../assets/shared/ui/PNG/Yellow/Default/button_rectangle_border.png'),
  },
} as const;
