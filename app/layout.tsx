import type { Metadata } from "next";
import "styles/globals.css";

// providers
import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";

import { siteConfig } from "@/config/site";

import { AuthProvider } from "features/auth/providers";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <AuthProvider>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
