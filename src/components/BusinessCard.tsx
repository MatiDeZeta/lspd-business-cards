"use client";

import { forwardRef } from "react";
import { CardData } from "@/app/page";

interface BusinessCardProps {
  data: CardData;
}

// Map ranks to badge images
const getBadgeImage = (rank: string): string => {
  const r = rank.toLowerCase();
  if (r.includes("chief of police")) return "/chief-badge.png";
  if (r.includes("assistant chief")) return "/asschief-badge.png";
  if (r.includes("deputy chief")) return "/depchief-badge.png";
  if (r.includes("commander")) return "/commander-badge.png";
  if (r.includes("captain")) return "/captain-badge.png";
  if (r.includes("lieutenant")) return "/lt-badge.png";
  if (r.includes("sergeant")) return "/sergeant-badge.png";
  if (r.includes("detective")) return "/detective-badge.png";
  return "/pofficer-badge.png";
};

const BusinessCard = forwardRef<HTMLDivElement, BusinessCardProps>(
  ({ data }, ref) => {
    const badgeSrc = getBadgeImage(data.rank);

    return (
      <div
        ref={ref}
        data-card="true"
        style={{
          width: "700px",
          height: "400px",
          backgroundColor: "#fafafa",
          position: "relative",
          fontFamily: "'Times New Roman', Times, serif",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px #e5e5e5",
          borderRadius: "16px",
          border: "2px solid #d1d5db",
        }}
      >
        {/* Realistic Paper Texture */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            pointerEvents: "none",
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='white' surfaceScale='1'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.4'/%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fibers' x='0' y='0'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02' numOctaves='1' result='turbulence'/%3E%3CfeColorMatrix in='turbulence' type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 1'/%3E%3C/feComponentTransfer%3E%3CfeComposite operator='over' in2='SourceGraphic'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23fibers)' opacity='0.3'/%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23grain)' opacity='0.6'/%3E%3C/svg%3E")
            `,
            backgroundBlendMode: "multiply, overlay, soft-light",
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px, 200px 200px, 300px 300px",
          }}
        />
        
        {/* Subtle paper fibers */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            pointerEvents: "none",
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(139, 69, 19, 0.03) 49%, rgba(139, 69, 19, 0.03) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(160, 82, 45, 0.02) 49%, rgba(160, 82, 45, 0.02) 51%, transparent 52%),
              linear-gradient(90deg, transparent 48%, rgba(210, 180, 140, 0.01) 49%, rgba(210, 180, 140, 0.01) 51%, transparent 52%)
            `,
            backgroundBlendMode: "multiply",
            backgroundSize: "20px 20px, 30px 30px, 40px 40px",
          }}
        />
        
        {/* Paper edge shadow */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle at 30% 40%, transparent 70%, rgba(0,0,0,0.05) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Badge - Left Side */}
        <div 
          style={{
            position: "absolute",
            left: "35px",
            top: "115px", 
            width: "160px",
            zIndex: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={badgeSrc}
            alt="Badge"
            crossOrigin="anonymous"
            style={{ 
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: "35px",
            left: "0",
            width: "100%",
            textAlign: "center",
            zIndex: 5,
          }}
        >
          <h1
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "32px",
              fontWeight: "900",
              color: "#000",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              margin: 0,
              transform: "scaleY(0.95)",
            }}
          >
            Los Santos Police Department
          </h1>
        </div>

        {/* User Info Area */}
        <div 
          style={{ 
            position: "absolute", 
            left: "240px", 
            top: "110px", 
            right: "40px",
            textAlign: "center"
          }}
        >
          <h2
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "36px",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              color: "#111",
            }}
          >
            {data.fullName || "Officer Name"}
          </h2>
          
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 4px 0",
              color: "#222",
            }}
          >
            {data.rank}
          </p>

          <p
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              margin: "0 0 20px 0",
              color: "#333",
            }}
          >
            {data.division} {data.division && data.assignment ? "—" : ""} {data.assignment}
          </p>

          {/* Contact Info */}
          <div 
            style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center", 
              gap: "15px",
              fontSize: "14px",
              color: "#111",
              fontWeight: "500",
            }}
          >
            <span>Tel: {data.phone}</span>
            <span>Cell: {data.cell}</span>
            <span>Serial: {data.serialNumber}</span>
          </div>
          <div style={{ fontSize: "14px", marginTop: "5px", color: "#111" }}>
            {data.email}
          </div>
        </div>

        {/* Address - Bottom Left */}
        <div 
          style={{ 
            position: "absolute", 
            left: "30px", 
            bottom: "45px",
            fontFamily: "'Times New Roman', serif",
            fontSize: "15px",
            fontWeight: "bold",
            color: "#111",
            lineHeight: "1.3",
            textAlign: "left",
          }}
        >
           {data.address.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Bottom Footer Text */}
        <div 
          style={{ 
            position: "absolute", 
            bottom: "15px", 
            width: "100%", 
            textAlign: "center",
            fontSize: "11px",
            fontWeight: "bold",
            color: "#000",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          Join the LSPD &nbsp;&nbsp;(866) 444-LSPD Recruitment Hotline &nbsp;&nbsp;www.LSPDonline.org &nbsp;www.joinLSPD.com
        </div>
      </div>
    );
  }
);

BusinessCard.displayName = "BusinessCard";

export default BusinessCard;
