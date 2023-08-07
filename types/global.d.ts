/// <reference types="nativewind/types" />`

export type Surah = {
  id: number;
  name: string;
  latin_name: string;
  number_of_ayah: number;
  place: string;
  translation: string;
  description: string;
  audio: string;
};

export type Ayah = {
  id: number;
  surahId: number;
  ayahId: number;
  ayahText: string;
  indoText: string;
  readText: string;
};
