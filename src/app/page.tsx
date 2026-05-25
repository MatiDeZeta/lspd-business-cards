"use client";

import { useMemo, useRef, useState } from "react";
import CardForm from "@/components/CardForm";
import ExportPanel from "@/components/ExportPanel";
import PreviewPanel from "@/components/PreviewPanel";
import { ExportQuality, useCardExport } from "@/hooks/useCardExport";
import { usePersistedCardData } from "@/hooks/usePersistedCardData";
import { getCardValidationWarnings } from "@/lib/validation";

export default function Home() {
  const { cardData, isHydrated, handleChange, handleReset } =
    usePersistedCardData();
  const [exportQuality, setExportQuality] = useState<ExportQuality>("high");
  const cardRef = useRef<HTMLDivElement>(null);

  const warnings = useMemo(
    () => getCardValidationWarnings(cardData),
    [cardData]
  );

  const {
    isExporting,
    exportMessage,
    clearExportMessage,
    handleDownload,
    handleDownloadGTAW,
  } = useCardExport({ cardRef, cardData, exportQuality });

  if (!isHydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500 text-sm tracking-widest uppercase">
          Loading
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12 relative z-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 no-print fade-in border-b border-neutral-800 pb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
            Los Santos Police Department
          </p>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">
            Card Generator
          </h1>
        </header>

        <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-start">
          <div className="space-y-8 no-print">
            <div className="panel fade-in">
              <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-8">
                Officer Information
              </h2>
              <CardForm
                cardData={cardData}
                warnings={warnings}
                onChange={handleChange}
              />
            </div>

            <ExportPanel
              exportQuality={exportQuality}
              isExporting={isExporting}
              exportMessage={exportMessage}
              onQualityChange={setExportQuality}
              onDownload={handleDownload}
              onDownloadGTAW={handleDownloadGTAW}
              onPrint={() => window.print()}
              onReset={handleReset}
              onDismissMessage={clearExportMessage}
            />
          </div>

          <PreviewPanel cardData={cardData} cardRef={cardRef} />
        </div>

        <footer className="mt-20 pt-8 border-t border-neutral-800 text-center no-print fade-in">
          <p className="text-neutral-600 text-xs leading-relaxed tracking-wide">
            Hecho con ❤️ por{" "}
            <a
              href="https://github.com/MatiDeZeta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              MatiDZ
            </a>{" "}
            para la comunidad de GTA World en Español
            <br />
            <span className="text-neutral-700">v2.0.0</span>
            <br />
            <a
              href="https://github.com/MatiDeZeta/lspd-business-cards"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
