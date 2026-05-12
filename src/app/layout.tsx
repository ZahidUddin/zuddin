import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Zahid Uddin | Senior WordPress Developer",
  description:
    "Premium portfolio of Zahid Uddin, Senior WordPress Developer and PHP Backend Engineer specializing in custom themes, plugins, WooCommerce, APIs, and performance optimization.",
  keywords: [
    "Zahid Uddin",
    "Senior WordPress Developer",
    "PHP Backend Developer",
    "WooCommerce Developer",
    "WordPress Plugin Developer",
    "WordPress Performance Optimization"
  ],
  authors: [{ name: "Zahid Uddin" }],
  openGraph: {
    title: "Zahid Uddin | Senior WordPress Developer",
    description:
      "Custom WordPress, PHP backend, WooCommerce, API integration, and performance-focused CMS development.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Zahid Uddin | Senior WordPress Developer",
    description:
      "Custom WordPress, PHP backend, WooCommerce, API integration, and performance-focused CMS development."
  }
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
