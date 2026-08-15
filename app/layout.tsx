import type { Metadata } from "next";
import "./globals.css";

// The active color theme, defined in app/globals.css as `[data-theme="..."]`.
// This is a developer-only switch — there is no end-user theme picker.
const ACTIVE_THEME = "default";

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
        <html lang="en" data-theme={ACTIVE_THEME}>
            <body>{children}</body>
        </html>
    );
}
