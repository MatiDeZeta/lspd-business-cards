"use client";

import { CardData } from "@/app/page";

const RANKS = [
  "Police Officer I",
  "Police Officer II",
  "Police Officer III",
  "Police Officer III+1",
  "Police Detective I",
  "Police Detective II",
  "Police Detective III",
  "Police Sergeant I",
  "Police Sergeant II",
  "Police Lieutenant I",
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
  // Patrol Divisions
  "Mission Row Division",
  "Vespucci Division",
  "Davis Division",
  "Vinewood Division",
  "Rockford Hills Division",
  "Del Perro Division",
  "La Mesa Division",
  "Sandy Shores Division",
  "Paleto Bay Division",
  // Detective Bureaus
  "Robbery-Homicide Division",
  "Commercial Crimes Division",
  "Juvenile Division",
  "Detective Support Division",
  // Specialized Units
  "Gang Enforcement Detail",
  "K-9 Unit",
  "SWAT",
  "Air Support Division",
  "Metropolitan Division",
  "Traffic Division",
  "Harbor Division",
  "Motor Unit",
  "Mounted Unit",
  // Administrative
  "Internal Affairs Division",
  "Training Division",
  "Personnel Division",
  "Public Affairs Division",
  "Office of the Chief of Police",
];

interface CardFormProps {
  cardData: CardData;
  onChange: (field: keyof CardData, value: string) => void;
  onReset: () => void;
}

export default function CardForm({ cardData, onChange, onReset }: CardFormProps) {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {/* Rank */}
      <div>
        <label
          htmlFor="rank"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Rank/Title
        </label>
        <select
          id="rank"
          value={cardData.rank}
          onChange={(e) => onChange("rank", e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        >
          {RANKS.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={cardData.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="e.g., John A. Smith"
          maxLength={40}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Serial Number */}
      <div>
        <label
          htmlFor="serialNumber"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Serial/Badge Number
        </label>
        <input
          type="text"
          id="serialNumber"
          value={cardData.serialNumber}
          onChange={(e) => onChange("serialNumber", e.target.value)}
          placeholder="e.g., 38291"
          maxLength={10}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Division */}
      <div>
        <label
          htmlFor="division"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Division/Unit
        </label>
        <select
          id="division"
          value={cardData.division}
          onChange={(e) => onChange("division", e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        >
          {DIVISIONS.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={cardData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="e.g., (213) 555-0147"
          maxLength={20}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={cardData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="e.g., j.smith@lspdonline.org"
          maxLength={40}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Street Address
        </label>
        <input
          type="text"
          id="address"
          value={cardData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="e.g., 1401 Sinner Street, Los Santos, SA 90017"
          maxLength={60}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Reset Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onReset}
          className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}
