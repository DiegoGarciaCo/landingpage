import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import ClarityInit from "@/components/ClarityInit";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "VIP Market Insider | Elgin & Chicago Real Estate Updates",
    description: "Stay ahead of the market with exclusive real estate insights for Elgin and Chicago. Get weekly market trends, property values, and insider tips delivered to your inbox.",
    keywords: "Elgin real estate market, Chicago real estate market, housing market updates, VIP market insider, property values, real estate trends, market analysis, home prices Elgin, home prices Chicago, real estate newsletter",
    authors: [{ name: "Diego Garcia" }],
    openGraph: {
        title: "Join the VIP Market Insider List | Elgin & Chicago Real Estate",
        description: "Get exclusive weekly market updates, trends, and insights for Elgin and Chicago real estate delivered straight to your inbox.",
        type: "website",
        locale: "en_US",
        siteName: "Diego Garcia Real Estate",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Elgin and Chicago Real Estate Market Updates",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "VIP Market Insider | Elgin & Chicago Real Estate",
        description: "Stay ahead with exclusive market updates and insights for Elgin and Chicago.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://soldbyghost.com",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <GoogleTagManager gtmId="GTM-52Q4BLGL" />
            <GoogleAnalytics gaId="G-QV8JG7WTWV" />
            <ClarityInit />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
