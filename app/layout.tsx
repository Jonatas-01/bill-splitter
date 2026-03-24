import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-primary",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "SplitIt - Bill Splitting Made Easy",
    description: "Split bills with ease using SplitIt. Upload your restaurant bill, review and edit the items, add your friends, and assign dishes to each person. Perfect for group dining!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${spaceGrotesk.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
