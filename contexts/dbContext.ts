import { Surah } from "@/types/global";
import { SQLiteDatabase } from "expo-sqlite";
import { createContext, useContext } from "react";

type DbContext = {
  db: SQLiteDatabase | null;
  surahList: Surah[];
};

export const dbContext = createContext<DbContext>({
  db: null,
  surahList: [],
});

export const useDbContext = () => useContext(dbContext);
