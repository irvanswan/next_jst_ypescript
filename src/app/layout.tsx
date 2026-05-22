import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IntlProvider } from "@/components/providers/IntlProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Core Admin",
  description: "PT Larantika Teknologi Semesta admin portal"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} min-h-screen bg-background font-sans antialiased`}>
        <QueryProvider>
          <ThemeProvider>
            <IntlProvider>{children}</IntlProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
