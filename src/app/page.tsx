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
        <p className="text-slate-400 text-sm tracking-wide">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-10 relative z-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 no-print fade-in">
          <div className="flex items-center gap-5 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo-LSPD.png"
              alt="LSPD Seal"
              className="w-14 h-14 object-contain opacity-90"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
                LSPD Card Generator
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Los Santos Police Department Business Cards
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-[#C5A028]/60 via-[#C5A028]/20 to-transparent max-w-md" />
        </header>

        <div className="grid lg:grid-cols-[1fr,auto] gap-10 items-start">
          <div className="space-y-6 no-print">
            <div className="panel-gold fade-in">
              <h2 className="text-xl font-light text-white mb-6 flex items-center gap-3">
                <span
                  className="w-1.5 h-1.5 bg-[#C5A028] rounded-full"
                  aria-hidden="true"
                />
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

        <footer className="mt-16 pt-8 border-t border-[#1e3a5f]/60 text-center no-print fade-in">
          <p className="text-slate-500 text-xs leading-relaxed">
            Hecho con ❤️ por{" "}
            <a
              href="https://github.com/MatiDeZeta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A028]/90 hover:text-[#C5A028] transition-colors duration-300"
            >
              MatiDZ
            </a>{" "}
            para la comunidad de GTA World en Español
            <br />
            Versión 2.0.0
            <br />
            <a
              href="https://github.com/MatiDeZeta/lspd-business-cards"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A028]/90 hover:text-[#C5A028] transition-colors duration-300"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
