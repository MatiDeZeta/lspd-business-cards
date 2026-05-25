"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BusinessCard from "@/components/BusinessCard";
import { CARD_HEIGHT, CARD_WIDTH } from "@/constants/cardDimensions";
import { CardData } from "@/types/card";

interface PreviewPanelProps {
  cardData: CardData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function PreviewPanel({ cardData, cardRef }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [badgeLoaded, setBadgeLoaded] = useState(false);

  const handleBadgeLoad = useCallback(() => {
    setBadgeLoaded(true);
  }, []);

  useEffect(() => {
    setBadgeLoaded(false);
  }, [cardData.rank]);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth - 48;
      const nextScale = Math.min(1, availableWidth / CARD_WIDTH);
      setScale(nextScale > 0 ? nextScale : 1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="flex flex-col items-center fade-in print-preview-root">
      <div className="mb-6 text-center no-print">
        <p className="text-sm text-[#C5A028]/80 uppercase tracking-[0.2em] mb-3 font-light">
          Live Preview
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-[#C5A028]/50 to-transparent w-24 mx-auto" />
      </div>

      <div
        ref={containerRef}
        className="preview-chrome w-full max-w-[760px] no-print relative"
      >
        {!badgeLoaded && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-[#0a1628]/40 backdrop-blur-sm"
          >
            <span className="text-sm text-slate-300">Loading preview...</span>
          </div>
        )}

        <div
          className="mx-auto overflow-hidden relative"
          style={{
            width: CARD_WIDTH * scale,
            height: CARD_HEIGHT * scale,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <BusinessCard
              ref={cardRef}
              data={cardData}
              onBadgeLoad={handleBadgeLoad}
            />
          </div>
        </div>
      </div>

      {/* Print-only duplicate — shown centered via print CSS */}
      <div className="print-only-card hidden">
        <BusinessCard data={cardData} />
      </div>
    </div>
  );
}
