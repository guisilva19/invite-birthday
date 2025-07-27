import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";


const dmSerifDisplay = DM_Serif_Display({
  weight:["400"],
  variable: "--font-dm-serif-display", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convite de aniversário",
  description: "Convite para o aniversário de 15 anos de Alicia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Alata&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${dmSerifDisplay.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
