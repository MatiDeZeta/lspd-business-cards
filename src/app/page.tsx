"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  email: "m.torres@lspdonline.org",
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
  // Specialized Divisions
  "Metropolitan Division",
  "Robbery-Homicide Division",
  "Gang and Narcotics Division",
  "Detective Support & Vice Division",
  "Juvenile Division",
  "Commercial Crimes Division",
  "Major Crimes Division",
  "Emergency Services Division",
  "Air Support Division",
  "Transit Services Division",
  "Security Services Division",
  "Technical Investigation Division",
  "Forensic Science Division",
  // Traffic Divisions
  "Central Traffic Division",
  "South Traffic Division",
  "West Traffic Division",
  "Valley Traffic Division",
  // Administrative Divisions
  "Internal Affairs Division",
  "Force Investigation Division",
  "Training Division",
  "Communications Division",
  "Personnel Division",
  "Recruitment and Employment Division",
  "Information Technology Division",
  "Media Relations Division",
  "Risk Management & Legal Affairs Division",
  "Audit Division",
  "Records and Identification Division",
  "Evidence and Property Management Division",
  "Motor Transport Division",
  "Custody Services Division",
  "Facilities Management Division",
  // Bureaus
  "Central Bureau",
  "South Bureau",
  "West Bureau",
  "Valley Bureau",
  "Detective Bureau",
  "Transit Services Bureau",
  "Professional Standards Bureau",
  "Human Resources Bureau",
  "Training Bureau",
  "Information Technology Bureau",
  "Administrative Services Bureau",
  "Counterterrorism and Special Operations Bureau",
  "Community Safety Partnership Bureau",
];

export default function Home() {
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [isExporting, setIsExporting] = useState(false);
  const [exportQuality, setExportQuality] = useState<"standard" | "high">("high");
  const cardRef = useRef<HTMLDivElement>(null);

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      }, 100);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, input, select, textarea, a')) {
        cursor.classList.add('hover');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, input, select, textarea, a')) {
        cursor.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cursor.remove();
      follower.remove();
    };
  }, []);

  // Snowflakes effect
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * window.innerWidth + 'px';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    };

    const interval = setInterval(createSnowflake, 300);

    return () => clearInterval(interval);
  }, []);

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

  const handleDownloadGTAW = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Calculate scale to achieve 1000x1415 output
      // Card is 510x290, we want 1000x1415 (note paper ratio)
      const targetWidth = 1000;
      const targetHeight = 1415;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 8, // High scale for quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
      });
      
      // Create a new canvas with the target dimensions
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = targetWidth;
      finalCanvas.height = targetHeight;
      const ctx = finalCanvas.getContext('2d');
      
      if (ctx) {
        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        
        // Calculate position to center the card in the note
        const cardAspect = canvas.width / canvas.height;
        const maxCardWidth = targetWidth - 80; // 40px padding each side
        const maxCardHeight = maxCardWidth / cardAspect;
        
        const cardX = (targetWidth - maxCardWidth) / 2;
        const cardY = (targetHeight - maxCardHeight) / 2; // Center vertically
        
        // Draw the card
        ctx.drawImage(canvas, cardX, cardY, maxCardWidth, maxCardHeight);
      }
      
      finalCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const safeName = cardData.fullName.replace(/[^a-zA-Z0-9]/g, "_") || "LSPD_Card";
          link.download = `${safeName}_GTAW_Note.png`;
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
  }, [cardData.fullName]);

  const handleReset = () => {
    setCardData(defaultCardData);
  };

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 no-print fade-in">
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">
            LSPD Card Generator
          </h1>
          <p className="text-neutral-400 text-sm">
            Los Santos Police Department Business Cards
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-start">
          {/* Form */}
          <div className="space-y-6 no-print fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Officer Information
              </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={cardData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                  placeholder="John A. Smith"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={cardData.serialNumber}
                  onChange={(e) => handleChange("serialNumber", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                  Rank
                </label>
                <select
                  value={cardData.rank}
                  onChange={(e) => handleChange("rank", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40"
                >
                  {RANKS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                  Division
                </label>
                <select
                  value={cardData.division}
                  onChange={(e) => handleChange("division", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                Assignment / Title
              </label>
              <input
                type="text"
                value={cardData.assignment}
                onChange={(e) => handleChange("assignment", e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                placeholder="Community Relations Officer"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                  Telephone
                </label>
                <input
                  type="tel"
                  value={cardData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                  placeholder="(213) 486-1163"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                  Cell
                </label>
                <input
                  type="tel"
                  value={cardData.cell}
                  onChange={(e) => handleChange("cell", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                  placeholder="(213) 555-0147"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                Email
              </label>
              <input
                type="email"
                value={cardData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                placeholder="name@lspdonline.org"
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs text-zinc-300 mb-2 uppercase tracking-wide font-medium">
                Address
              </label>
              <textarea
                value={cardData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-white text-sm resize-none backdrop-blur-sm transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-800/40 placeholder:text-zinc-500"
                placeholder="1401 Sinner Street&#10;Los Santos, SA 90017"
              />
            </div>
            </div>
            
            {/* Actions */}
            <div className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 shadow-xl space-y-6 fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-light text-white mb-6">Export Options</h3>
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl">
                <span className="text-sm text-zinc-300 font-medium">Export Quality</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setExportQuality("standard")}
                    className={`px-6 py-2 text-sm rounded-2xl transition-all duration-300 ${
                      exportQuality === "standard"
                        ? "bg-white text-black shadow-lg"
                        : "bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setExportQuality("high")}
                    className={`px-6 py-2 text-sm rounded-2xl transition-all duration-300 ${
                      exportQuality === "high"
                        ? "bg-white text-black shadow-lg"
                        : "bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    High Quality
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex-1 py-4 bg-white text-black text-sm font-medium rounded-2xl hover:bg-neutral-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
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
                  className="flex-1 py-4 bg-zinc-800 text-white text-sm font-medium rounded-2xl hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>
              
              <button
                onClick={handleDownloadGTAW}
                disabled={isExporting}
                className="w-full py-4 bg-zinc-700 text-white text-sm font-medium rounded-2xl hover:bg-zinc-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Note GTAW (1000×1415)
              </button>
              
              <button
                onClick={handleReset}
                className="w-full py-3 text-zinc-400 text-sm hover:text-zinc-200 transition-colors duration-300"
              >
                Reset to Default
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="mb-8 text-center no-print">
              <p className="text-sm text-zinc-400 uppercase tracking-wide mb-3 font-light">Live Preview</p>
              <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent w-24"></div>
            </div>
            <div className="bg-zinc-900/10 backdrop-blur-sm border border-zinc-800/30 rounded-3xl p-12 shadow-2xl">
              <BusinessCard ref={cardRef} data={cardData} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-zinc-800 text-center no-print fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-zinc-500 text-xs">
            Hecho con ❤️ por <a href="https://github.com/MatiDeZeta" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-zinc-100 transition-colors duration-300">MatiDZ</a> para la comunidad de GTA World en Español
            <br />
            Versión 1.0.0
            <br />
            <a href="https://github.com/MatiDeZeta/lspd-business-cards" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-zinc-100 transition-colors duration-300">GitHub</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
