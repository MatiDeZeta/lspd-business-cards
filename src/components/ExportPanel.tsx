"use client";

import { ExportQuality } from "@/hooks/useCardExport";

interface ExportPanelProps {
  exportQuality: ExportQuality;
  isExporting: boolean;
  exportMessage: string | null;
  onQualityChange: (quality: ExportQuality) => void;
  onDownload: () => void;
  onDownloadGTAW: () => void;
  onPrint: () => void;
  onReset: () => void;
  onDismissMessage: () => void;
}

export default function ExportPanel({
  exportQuality,
  isExporting,
  exportMessage,
  onQualityChange,
  onDownload,
  onDownloadGTAW,
  onPrint,
  onReset,
  onDismissMessage,
}: ExportPanelProps) {
  return (
    <div className="panel-gold space-y-6 fade-in">
      <h3 className="text-lg font-light text-white mb-2 flex items-center gap-3">
        <span className="h-px w-6 bg-[#C5A028]/70" aria-hidden="true" />
        Export Options
      </h3>

      {exportMessage && (
        <div
          className="flex items-start justify-between gap-3 rounded-xl border border-[#C5A028]/30 bg-[#C5A028]/10 px-4 py-3 text-sm text-[#f5e6b8]"
          role="status"
        >
          <span>{exportMessage}</span>
          <button
            type="button"
            onClick={onDismissMessage}
            className="shrink-0 text-[#C5A028] hover:text-white transition-colors"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-[#0a1628]/50 rounded-2xl border border-[#1e3a5f]/40">
        <span className="text-sm text-slate-300 font-medium">Export Quality</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onQualityChange("standard")}
            className={`px-5 py-2 text-sm rounded-xl transition-all duration-300 ${
              exportQuality === "standard"
                ? "bg-[#C5A028] text-[#002244] font-medium shadow-lg"
                : "bg-[#1e3a5f]/50 text-slate-300 hover:bg-[#1e3a5f]"
            }`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => onQualityChange("high")}
            className={`px-5 py-2 text-sm rounded-xl transition-all duration-300 ${
              exportQuality === "high"
                ? "bg-[#C5A028] text-[#002244] font-medium shadow-lg"
                : "bg-[#1e3a5f]/50 text-slate-300 hover:bg-[#1e3a5f]"
            }`}
          >
            High Quality
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onDownload}
          disabled={isExporting}
          className="flex-1 py-4 bg-[#C5A028] text-[#002244] text-sm font-semibold rounded-xl hover:bg-[#d4b23a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PNG
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="flex-1 py-4 bg-[#1e3a5f] text-white text-sm font-medium rounded-xl hover:bg-[#254a75] transition-all duration-300 flex items-center justify-center gap-2 border border-[#C5A028]/20"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print
        </button>
      </div>

      <button
        type="button"
        onClick={onDownloadGTAW}
        disabled={isExporting}
        className="w-full py-4 bg-[#0a1628] text-white text-sm font-medium rounded-xl hover:bg-[#122038] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-[#1e3a5f]/60"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Note GTAW (1000×1415)
      </button>

      <button
        type="button"
        onClick={onReset}
        className="w-full py-3 text-slate-400 text-sm hover:text-[#C5A028] transition-colors duration-300"
      >
        Reset to Default
      </button>
    </div>
  );
}
