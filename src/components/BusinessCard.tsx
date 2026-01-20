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
          backgroundColor: "#fdfdfd",
          position: "relative",
          fontFamily: "'Times New Roman', Times, serif",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 0 0 1px #e5e5e5", // Subtle border
        }}
      >
        {/* Paper Texture Overlay */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
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
