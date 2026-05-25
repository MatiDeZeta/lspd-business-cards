"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CARD_STORAGE_KEY,
  CardData,
  DEFAULT_CARD_DATA,
} from "@/types/card";

function loadStoredCardData(): CardData {
  if (typeof window === "undefined") return DEFAULT_CARD_DATA;

  try {
    const raw = localStorage.getItem(CARD_STORAGE_KEY);
    if (!raw) return DEFAULT_CARD_DATA;

    const parsed = JSON.parse(raw) as Partial<CardData>;
    return { ...DEFAULT_CARD_DATA, ...parsed };
  } catch {
    return DEFAULT_CARD_DATA;
  }
}

export function usePersistedCardData() {
  const [cardData, setCardData] = useState<CardData>(DEFAULT_CARD_DATA);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setCardData(loadStoredCardData());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cardData));
  }, [cardData, isHydrated]);

  const handleChange = useCallback((field: keyof CardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setCardData(DEFAULT_CARD_DATA);
    localStorage.removeItem(CARD_STORAGE_KEY);
  }, []);

  return {
    cardData,
    isHydrated,
    handleChange,
    handleReset,
  };
}
