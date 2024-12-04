import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Script from 'next/script';
import { AuthProvider } from "@/contexts/AuthProvider";
import { ToastProvider } from "@/contexts/ToastProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Din Mægler",
    template: "%s | Din Mægler",
  },
  description: "Din Mægler Roskilde, er din boligbutik i lokalområdet",
  robots: 'index, follow',

  twitter: {
    card: "summary_large_image",
    title: "Din Mægler",
    description: "Din Mægler Roskilde, er din boligbutik i lokalområdet",
    type: "website",
    url: "https://dinmaegler.vercel.app",
    images: [
      {
        url: "https://dinmaegler.vercel.app/api/og/1200x630",
        width: 1200,
        height: 630,
        alt: 'Din mægler OG Image',
      }
    ],
    siteName: "Din Mægler",
    locale: "da_DK",
  },

  openGraph: {
    title: "Din Mægler",
    description: "Din Mægler Roskilde, er din boligbutik i lokalområdet",
    type: "website",
    url: "https://dinmaegler.vercel.app",
    images: [
      {
        url: "https://dinmaegler.vercel.app/api/og/1200x630",
        width: 1200,
        height: 630,
        alt: 'Din mægler OG Image',
      }
    ],
    siteName: "Din Mægler",
    locale: "da_DK",
  },

  alternates: {
    canonical: "https://dinmaegler.vercel.app",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Din Mægler",
  url: "https://dinmaegler.vercel.app",
  telephone: "+45 70 00 00 00",
  description: "Din Mægler Roskilde, er din boligbutik i lokalområdet",
  email: "4000@dinmaegler.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Stændertorvet 78",
    addressLocality: "Roskilde",
    addressCountry: "DK",
    postalCode: "4000",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          key={"structured-data"}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
