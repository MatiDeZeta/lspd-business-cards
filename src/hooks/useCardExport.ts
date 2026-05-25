"use client";

import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  GTAW_NOTE_HEIGHT,
  GTAW_NOTE_WIDTH,
} from "@/constants/cardDimensions";
import { getBadgeImage, preloadImage } from "@/lib/badgeImage";
import { CardData } from "@/types/card";

export type ExportQuality = "standard" | "high";

interface UseCardExportOptions {
  cardRef: React.RefObject<HTMLDivElement | null>;
  cardData: CardData;
  exportQuality: ExportQuality;
}

export function useCardExport({
  cardRef,
  cardData,
  exportQuality,
}: UseCardExportOptions) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const clearExportMessage = useCallback(() => {
    setExportMessage(null);
  }, []);

  const prepareExport = useCallback(async () => {
    if (!cardRef.current) return false;

    await preloadImage(getBadgeImage(cardData.rank));
    await new Promise((resolve) => setTimeout(resolve, 50));
    return true;
  }, [cardData.rank, cardRef]);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    setExportMessage(null);

    try {
      const ready = await prepareExport();
      if (!ready) return;

      const scale = exportQuality === "high" ? 6 : 4;

      const canvas = await html2canvas(cardRef.current, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector("[data-card]");
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = "none";
          }
        },
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const safeName =
            cardData.fullName.replace(/[^a-zA-Z0-9]/g, "_") || "LSPD_Card";
          const date = new Date().toISOString().split("T")[0];
          link.download = `${safeName}_LSPD_BusinessCard_${date}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          setExportMessage("Card downloaded successfully.");
        },
        "image/png",
        1.0
      );
    } catch (error) {
      console.error("Export error:", error);
      setExportMessage("Failed to export card. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [cardData.fullName, cardRef, exportQuality, prepareExport]);

  const handleDownloadGTAW = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    setExportMessage(null);

    try {
      const ready = await prepareExport();
      if (!ready) return;

      // Card canvas is CARD_WIDTH×CARD_HEIGHT (700×400); composite onto GTAW note paper
      const targetWidth = GTAW_NOTE_WIDTH;
      const targetHeight = GTAW_NOTE_HEIGHT;

      const canvas = await html2canvas(cardRef.current, {
        scale: 8,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector("[data-card]");
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = "none";
          }
        },
      });

      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = targetWidth;
      finalCanvas.height = targetHeight;
      const ctx = finalCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        const cardAspect = canvas.width / canvas.height;
        const maxCardWidth = targetWidth - 80;
        const maxCardHeight = maxCardWidth / cardAspect;

        const cardX = (targetWidth - maxCardWidth) / 2;
        const cardY = (targetHeight - maxCardHeight) / 2;

        ctx.drawImage(canvas, cardX, cardY, maxCardWidth, maxCardHeight);
      }

      finalCanvas.toBlob(
        (blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const safeName =
            cardData.fullName.replace(/[^a-zA-Z0-9]/g, "_") || "LSPD_Card";
          link.download = `${safeName}_GTAW_Note.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          setExportMessage("GTAW note exported successfully.");
        },
        "image/png",
        1.0
      );
    } catch (error) {
      console.error("Export error:", error);
      setExportMessage("Failed to export GTAW note. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [cardData.fullName, cardRef, prepareExport]);

  return {
    isExporting,
    exportMessage,
    clearExportMessage,
    handleDownload,
    handleDownloadGTAW,
    cardDimensions: { width: CARD_WIDTH, height: CARD_HEIGHT },
  };
}
