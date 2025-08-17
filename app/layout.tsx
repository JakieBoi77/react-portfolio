import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Jake's Portfolio",
    description: "A portfolio created by the one and only Jake Finlay.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
