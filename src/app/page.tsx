"use client";

import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import BusinessCard from "@/components/BusinessCard";

export interface CardData {
  rank: string;
  fullName: string;
  serialNumber: string;
  division: string;
  assignment: string;
  phone: string;
  cell: string;
  email: string;
  address: string;
}

const defaultCardData: CardData = {
  rank: "Police Officer III",
  fullName: "Michael R. Torres",
  serialNumber: "38291",
  division: "Central Area",
  assignment: "Community Relations Officer",
  phone: "(213) 486-1163",
  cell: "(213) 555-0147",
  email: "m.torres@lspd.gta.gov",
  address: "1401 Sinner Street\nLos Santos, SA 90017",
};

const RANKS = [
  "Police Officer I",
  "Police Officer II", 
  "Police Officer III",
  "Police Officer III+1",
  "Detective I",
  "Detective II",
  "Detective III",
  "Sergeant I",
  "Sergeant II",
  "Lieutenant I",
  "Lieutenant II",
  "Captain I",
  "Captain II",
  "Captain III",
  "Commander",
  "Deputy Chief",
  "Assistant Chief",
  "Chief of Police",
];

const DIVISIONS = [
  "Central Area",
  "Rampart Area",
  "Southwest Area",
  "Hollenbeck Area",
  "Harbor Area",
  "Hollywood Area",
  "Wilshire Area",
  "West Los Angeles Area",
  "Van Nuys Area",
  "West Valley Area",
  "Northeast Area",
  "77th Street Area",
  "Newton Area",
  "Pacific Area",
  "North Hollywood Area",
  "Foothill Area",
  "Devonshire Area",
  "Southeast Area",
  "Mission Area",
  "Olympic Area",
  "Topanga Area",
];

export default function Home() {
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [isExporting, setIsExporting] = useState(false);
  const [exportQuality, setExportQuality] = useState<"standard" | "high">("high");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof CardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    
    try {
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const scale = exportQuality === "high" ? 6 : 4;
      
      const canvas = await html2canvas(cardRef.current, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-card]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = 'none';
          }
        },
      });
      
      // Convert to blob for better quality
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const safeName = cardData.fullName.replace(/[^a-zA-Z0-9]/g, "_") || "LSPD_Card";
          const date = new Date().toISOString().split('T')[0];
          link.download = `${safeName}_LSPD_BusinessCard_${date}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png", 1.0);
      
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export card. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [cardData.fullName, exportQuality]);

  const handleReset = () => {
    setCardData(defaultCardData);
  };

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 no-print">
          <h1 className="text-3xl font-light tracking-tight text-white mb-1">
            LSPD Card Generator
          </h1>
          <p className="text-neutral-500 text-sm">
            Los Santos Police Department Business Cards
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,auto] gap-10 items-start">
          {/* Form */}
          <div className="space-y-6 no-print">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  value={cardData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                  placeholder="John A. Smith"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={cardData.serialNumber}
                  onChange={(e) => handleChange("serialNumber", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                  Rank
                </label>
                <select
                  value={cardData.rank}
                  onChange={(e) => handleChange("rank", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                >
                  {RANKS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                  Division
                </label>
                <select
                  value={cardData.division}
                  onChange={(e) => handleChange("division", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                Assignment / Title
              </label>
              <input
                type="text"
                value={cardData.assignment}
                onChange={(e) => handleChange("assignment", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                placeholder="Community Relations Officer"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                  Telephone
                </label>
                <input
                  type="tel"
                  value={cardData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                  placeholder="(213) 486-1163"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                  Cell
                </label>
                <input
                  type="tel"
                  value={cardData.cell}
                  onChange={(e) => handleChange("cell", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                  placeholder="(213) 555-0147"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={cardData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                placeholder="name@lspd.gta.gov"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
                Address
              </label>
              <textarea
                value={cardData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm resize-none"
                placeholder="1401 Sinner Street&#10;Los Santos, SA 90017"
              />
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              {/* Quality selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Export Quality</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setExportQuality("standard")}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      exportQuality === "standard"
                        ? "bg-white text-black"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setExportQuality("high")}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      exportQuality === "high"
                        ? "bg-white text-black"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    High Quality
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex-1 py-2.5 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isExporting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PNG
                    </>
                  )}
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-neutral-800 text-white text-sm font-medium rounded hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>
              
              <button
                onClick={handleReset}
                className="w-full py-2 text-neutral-500 text-xs hover:text-neutral-300 transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-neutral-600 mb-4 no-print uppercase tracking-wider">Preview</p>
            <BusinessCard ref={cardRef} data={cardData} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-neutral-900 text-center no-print">
          <p className="text-neutral-600 text-xs">
            For entertainment purposes only · Inspired by LAPD
          </p>
        </footer>
      </div>
    </main>
  );
}
