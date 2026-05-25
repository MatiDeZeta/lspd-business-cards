import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LSPD Card Generator",
    template: "%s · LSPD Card Generator",
  },
  description:
    "Generate realistic Los Santos Police Department business cards — live preview, rank-specific badge images, high-quality PNG export and printable templates.",
  keywords: [
    "LSPD business card",
    "police business card generator",
    "badge business card",
    "law enforcement card maker",
    "LSPD",
    "GTA World",
    "business card template",
  ],
  authors: [
    {
      name: "MatiDZ",
      url: "https://github.com/MatiDeZeta",
    },
  ],
  openGraph: {
    title: "LSPD Card Generator",
    description:
      "Create realistic LSPD-style business cards with your own details and badge images.",
    siteName: "LSPD Card Generator",
    images: ["/lspdcard.png", "/favicon.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "LSPD Card Generator",
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-128x128.png",
  },
};

export const viewport = {
  themeColor: "#002244",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-48x48.png"
          sizes="48x48"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-64x64.png"
          sizes="64x64"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-128x128.png"
          sizes="128x128"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-256x256.png"
          sizes="256x256"
          type="image/png"
        />
        <link rel="shortcut icon" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/favicon-128x128.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#002244" />
        <link rel="canonical" href="/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
