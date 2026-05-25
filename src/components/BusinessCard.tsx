"use client";

import { forwardRef, useEffect, useState } from "react";
import { CARD_HEIGHT, CARD_WIDTH } from "@/constants/cardDimensions";
import { getBadgeImage } from "@/lib/badgeImage";
import { CardData } from "@/types/card";

interface BusinessCardProps {
  data: CardData;
  onBadgeLoad?: () => void;
}

const SERIF = "'Times New Roman', Times, serif";
const PAPER_COLOR = "#F7F5F0";

const BusinessCard = forwardRef<HTMLDivElement, BusinessCardProps>(
  ({ data, onBadgeLoad }, ref) => {
    const badgeSrc = getBadgeImage(data.rank);
    const [badgeReady, setBadgeReady] = useState(false);

    useEffect(() => {
      setBadgeReady(false);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setBadgeReady(true);
        onBadgeLoad?.();
      };
      img.onerror = () => {
        setBadgeReady(true);
        onBadgeLoad?.();
      };
      img.src = badgeSrc;
    }, [badgeSrc, onBadgeLoad]);

    const divisionLine = [data.division, data.assignment]
      .filter(Boolean)
      .join(data.division && data.assignment ? " — " : "");

    const contactItems = [
      data.phone && `Tel: ${data.phone}`,
      data.cell && `Cell: ${data.cell}`,
      data.fax && `Fax: ${data.fax}`,
      data.serialNumber && `Serial: ${data.serialNumber}`,
    ].filter(Boolean);

    return (
      <div
        ref={ref}
        data-card="true"
        style={{
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          backgroundColor: PAPER_COLOR,
          position: "relative",
          fontFamily: SERIF,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Light paper grain */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />

        {/* Subtle edge vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 50%, transparent 65%, rgba(0,0,0,0.04) 100%)",
          }}
        />

        {/* LSPD seal watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo-LSPD.png"
          alt=""
          aria-hidden="true"
          crossOrigin="anonymous"
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "180px",
            height: "auto",
            opacity: 0.04,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Department header */}
        <div
          style={{
            position: "absolute",
            top: "28px",
            left: 0,
            width: "100%",
            textAlign: "center",
            zIndex: 5,
          }}
        >
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "30px",
              fontWeight: 900,
              color: "#000",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Los Santos Police Department
          </h1>
        </div>

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            left: "32px",
            top: "108px",
            width: "155px",
            zIndex: 20,
          }}
        >
          {badgeReady ? (
            /* eslint-disable-next-line @next/next/no-img-element */
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
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "0.77",
                backgroundColor: "rgba(0,34,68,0.06)",
              }}
            />
          )}
        </div>

        {/* Officer info */}
        <div
          style={{
            position: "absolute",
            left: "228px",
            top: "102px",
            right: "32px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "36px",
              fontWeight: "bold",
              margin: "0 0 6px 0",
              color: "#111",
              lineHeight: 1.05,
            }}
          >
            {data.fullName || "Officer Name"}
          </h2>

          <p
            style={{
              fontSize: "19px",
              fontWeight: "bold",
              margin: "0 0 4px 0",
              color: "#222",
            }}
          >
            {data.rank}
          </p>

          {divisionLine && (
            <p
              style={{
                fontSize: "15px",
                fontStyle: "italic",
                margin: "0 0 16px 0",
                color: "#333",
                lineHeight: 1.3,
              }}
            >
              {divisionLine}
            </p>
          )}

          {contactItems.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                fontSize: "13px",
                color: "#111",
                fontWeight: 500,
                marginBottom: "4px",
              }}
            >
              {contactItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}

          {data.email && (
            <div
              style={{
                fontSize: "13px",
                marginTop: "2px",
                color: "#111",
                fontWeight: 500,
              }}
            >
              {data.email}
            </div>
          )}
        </div>

        {/* HQ address */}
        <div
          style={{
            position: "absolute",
            left: "28px",
            bottom: "42px",
            fontFamily: SERIF,
            fontSize: "14px",
            fontWeight: "bold",
            color: "#111",
            lineHeight: 1.35,
            textAlign: "left",
            zIndex: 10,
          }}
        >
          {data.address.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Recruitment footer */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            width: "100%",
            textAlign: "center",
            fontSize: "10px",
            fontWeight: "bold",
            color: "#000",
            fontFamily: SERIF,
            letterSpacing: "0.01em",
            zIndex: 10,
          }}
        >
          Join the LSPD &nbsp;&nbsp;(866) 444-LSPD Recruitment Hotline
          &nbsp;&nbsp;www.LSPDonline.org &nbsp;www.joinLSPD.com
        </div>
      </div>
    );
  }
);

BusinessCard.displayName = "BusinessCard";

export default BusinessCard;
