export interface Name {
  official: string;
  nativeName: { [key: string]: { official: string; common: string } };
}

export interface Flags {
  png: string;
  svg: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Country {
  name: Name;
  cca2: string;
  cca3: string;
  flags: Flags;
  altSpellings: string[];
  idd: Idd;
}
