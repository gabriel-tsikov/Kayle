export interface Theme {
  name: string;
  properties: any;
}

export interface ThemeOptions {
  themes: Theme[];
  active?: string;
}
