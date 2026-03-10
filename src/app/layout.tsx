import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Savvy Dental Clinic | Aesthetic & Dental Care",
  description:
    "Savvy Dental Clinic offers premium aesthetic and dental care in Riyadh. Orthodontics, dental implants, cosmetic dentistry, teeth whitening, pediatric dentistry, and oral surgery.",
  keywords:
    "dental clinic, Riyadh, orthodontics, dental implants, cosmetic dentistry, teeth whitening, pediatric dentistry, oral surgery",
  openGraph: {
    title: "Savvy Dental Clinic | Aesthetic & Dental Care",
    description:
      "Premium aesthetic and dental care in Riyadh. Book your appointment today.",
    type: "website",
    locale: "en_US",
    siteName: "Savvy Dental Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Savvy Dental Clinic | Aesthetic & Dental Care",
    description:
      "Premium aesthetic and dental care in Riyadh. Book your appointment today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Savvy Dental Clinic",
  description: "Aesthetic & Dental Care in Riyadh",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  medicalSpecialty: [
    "Orthodontics",
    "Dental Implants",
    "Cosmetic Dentistry",
    "Teeth Whitening",
    "Pediatric Dentistry",
    "Oral Surgery",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              className:
                "!bg-[var(--card-bg)] !text-[var(--foreground)] !border !border-[var(--card-border)]",
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
