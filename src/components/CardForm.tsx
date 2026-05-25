"use client";

import { DIVISIONS } from "@/constants/divisions";
import { RANKS } from "@/constants/ranks";
import { ValidationWarning } from "@/lib/validation";
import { CardData } from "@/types/card";

interface CardFormProps {
  cardData: CardData;
  warnings: ValidationWarning[];
  onChange: (field: keyof CardData, value: string) => void;
}

const inputClassName =
  "w-full px-4 py-3 bg-[#0a1628]/60 border border-[#1e3a5f]/60 rounded-xl text-white text-sm backdrop-blur-sm transition-all duration-200 focus:border-[#C5A028]/60 focus:bg-[#0a1628]/80 focus:ring-1 focus:ring-[#C5A028]/40 placeholder:text-slate-500";

const labelClassName =
  "block text-xs text-slate-300 mb-2 uppercase tracking-wide font-medium";

export default function CardForm({
  cardData,
  warnings,
  onChange,
}: CardFormProps) {
  const warningFields = new Set(warnings.map((w) => w.field));

  return (
    <form className="space-y-0" onSubmit={(e) => e.preventDefault()}>
      {warnings.length > 0 && (
        <div
          className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3"
          role="status"
        >
          <ul className="space-y-1 text-sm text-amber-100">
            {warnings.map((warning) => (
              <li key={warning.field}>{warning.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="fullName" className={labelClassName}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={cardData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={`${inputClassName} ${
              warningFields.has("fullName") ? "border-amber-500/50" : ""
            }`}
            placeholder="John A. Smith"
          />
        </div>
        <div>
          <label htmlFor="serialNumber" className={labelClassName}>
            Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            value={cardData.serialNumber}
            onChange={(e) => onChange("serialNumber", e.target.value)}
            className={inputClassName}
            placeholder="12345"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="rank" className={labelClassName}>
            Rank
          </label>
          <select
            id="rank"
            value={cardData.rank}
            onChange={(e) => onChange("rank", e.target.value)}
            className={inputClassName}
          >
            {RANKS.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="division" className={labelClassName}>
            Division
          </label>
          <select
            id="division"
            value={cardData.division}
            onChange={(e) => onChange("division", e.target.value)}
            className={inputClassName}
          >
            {DIVISIONS.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="assignment" className={labelClassName}>
          Assignment / Title
        </label>
        <input
          type="text"
          id="assignment"
          value={cardData.assignment}
          onChange={(e) => onChange("assignment", e.target.value)}
          className={inputClassName}
          placeholder="Community Relations Officer"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="phone" className={labelClassName}>
            Telephone
          </label>
          <input
            type="tel"
            id="phone"
            value={cardData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClassName}
            placeholder="(213) 486-1163"
          />
        </div>
        <div>
          <label htmlFor="cell" className={labelClassName}>
            Cell
          </label>
          <input
            type="tel"
            id="cell"
            value={cardData.cell}
            onChange={(e) => onChange("cell", e.target.value)}
            className={inputClassName}
            placeholder="(213) 555-0147"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="fax" className={labelClassName}>
            Fax <span className="normal-case text-slate-500">(optional)</span>
          </label>
          <input
            type="tel"
            id="fax"
            value={cardData.fax}
            onChange={(e) => onChange("fax", e.target.value)}
            className={inputClassName}
            placeholder="(213) 486-0000"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={cardData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`${inputClassName} ${
              warningFields.has("email") ? "border-amber-500/50" : ""
            }`}
            placeholder="name@lspdonline.org"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className={labelClassName}>
          Address
        </label>
        <textarea
          id="address"
          value={cardData.address}
          onChange={(e) => onChange("address", e.target.value)}
          rows={2}
          className={`${inputClassName} resize-none`}
          placeholder={"1401 Sinner Street\nLos Santos, SA 90017"}
        />
      </div>
    </form>
  );
}
