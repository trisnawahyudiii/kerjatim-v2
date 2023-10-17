import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Plus_Jakarta_Sans } from "next/font/google";
import "styles/globals.css";
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

// auth
import { AuthProvider } from "features/auth/providers";

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
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
