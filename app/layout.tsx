import type { Metadata } from "next";

import "./globals.css";
import localFont from 'next/font/local'
import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "react-hot-toast";

const arad = localFont({
  src: [
    {
      path: '../public/fonts/AradFD-RegularDots3.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-MediumDots3.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-SemiBoldDots3.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-BoldDots3.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-ExtraBoldDots3.woff2',
      weight: '800',
      style: 'normal'
    },
  ],
  variable: "--font-arad",
  display: 'swap',
});

const lalezar = localFont({
  src: [
    {
      path: '../public/fonts/Lalezar-Regular.woff',
    }
  ],
  variable: "--font-lalezar",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "نواندیش",
  description: "بنیاد تعالی آموزش‌های تخصصی نواندیش",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="rtl"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", arad.variable, lalezar.variable, "font-arad")}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            {children}

            <Toaster toastOptions={{
              success: {
                duration: 4000,
                style: {
                  border: 'solid 1px oklch(76.8% 0.233 130.85)',
                  color: 'oklch(76.8% 0.233 130.85)',
                  backgroundColor: '#f7fee7'
                }
              },
              error: {
                duration: 4000,
                style: {
                  border: 'solid 1px #fb2c36',
                  color: '#fb2c36',
                  backgroundColor: '#fef2f2'
                }
              }
            }} />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
