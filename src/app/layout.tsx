import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LSPD Card Generator",
  description: "Create Los Santos Police Department business cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
