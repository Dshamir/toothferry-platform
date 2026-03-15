import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Syne, DM_Sans } from "next/font/google";
import { ThemeLoader } from "@/components/shared/ThemeLoader";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToothFerry AI — Multi-Portal Platform",
  description:
    "AI-generated dental crowns in under two minutes. From scan to STL.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} ${syne.variable} ${dmSans.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter, var(--font-body))",
        }}
      >
        <ThemeLoader />
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
