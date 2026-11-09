export enum Language {
  Fa = 'fa',
  En = 'en',
}

export enum Direction {
  Rtl = 'rtl',
  Ltr = 'ltr',
}

export const languageDirection: Record<Language, Direction> = {
  [Language.Fa]: Direction.Rtl,
  [Language.En]: Direction.Ltr,
};

export const DEFAULT_LANGUAGE = Language.Fa;
