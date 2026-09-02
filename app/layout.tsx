import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/custom/json-ld";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_ORGANIZATION_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // عنوان صفحه‌های داخلی به این قالب اضافه می‌شود: «دوره‌ها | نواندیش»
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_ORGANIZATION_NAME, url: SITE_URL }],
  creator: SITE_ORGANIZATION_NAME,
  publisher: SITE_ORGANIZATION_NAME,
  category: "education",
  // شماره‌تلفن و ایمیل موجود در متن صفحه را به لینک تبدیل نکن
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#082f49" },
  ],
};

/** structured data سراسری: سازمان و وب‌سایت */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_ORGANIZATION_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description: SITE_DESCRIPTION,
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "fa-IR",
  publisher: {
    "@type": "Organization",
    name: SITE_ORGANIZATION_NAME,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", arad.variable, lalezar.variable, "font-arad")}
    >
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
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
