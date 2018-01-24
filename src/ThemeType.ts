export enum ThemeType {
  Light,
  Dark
}

export function themeTypeToString(theme: ThemeType): string {
  switch (theme) {
  case ThemeType.Light:
    return 'Light'
  case ThemeType.Dark:
    return 'Dark'
  }
}

export function stringToThemeType(themeName: string): ThemeType {
  switch (themeName) {
  case 'Light':
    return ThemeType.Light
  case 'Dark':
    return ThemeType.Dark
  default:
    return ThemeType.Light
  }
}
