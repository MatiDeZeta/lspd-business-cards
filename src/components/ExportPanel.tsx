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

const toggleClass = (active: boolean) =>
  active
    ? "bg-white text-black border-white"
    : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white";

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
    <div className="panel space-y-6 fade-in">
      <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-500">
        Export
      </h3>

      {exportMessage && (
        <div
          className="flex items-start justify-between gap-3 border border-neutral-700 px-4 py-3 text-sm text-neutral-300"
          role="status"
        >
          <span>{exportMessage}</span>
          <button
            type="button"
            onClick={onDismissMessage}
            className="shrink-0 text-neutral-500 hover:text-white transition-colors"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center justify-between py-3 border-y border-neutral-800">
        <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-500">
          Quality
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onQualityChange("standard")}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider border transition-colors ${toggleClass(exportQuality === "standard")}`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => onQualityChange("high")}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider border transition-colors ${toggleClass(exportQuality === "high")}`}
          >
            High
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={isExporting}
          className="flex-1 py-3 bg-white text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isExporting ? "Exporting..." : "Download PNG"}
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="flex-1 py-3 bg-transparent text-white text-xs uppercase tracking-[0.15em] border border-neutral-800 hover:border-white transition-colors flex items-center justify-center"
        >
          Print
        </button>
      </div>

      <button
        type="button"
        onClick={onDownloadGTAW}
        disabled={isExporting}
        className="w-full py-3 bg-transparent text-neutral-400 text-xs uppercase tracking-[0.15em] border border-neutral-800 hover:border-neutral-500 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        GTAW Note · 1000×1415
      </button>

      <button
        type="button"
        onClick={onReset}
        className="w-full py-2 text-neutral-600 text-xs uppercase tracking-[0.15em] hover:text-white transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
