import type { Metadata } from "next"
import DevThemeSwitcher from "./(portfolio)/_components/dev-theme-switcher"
import { ThemeProvider } from "./(portfolio)/_styles/ThemeProvider"
import { themeAttributes } from "./(portfolio)/_styles/theme"
import "./globals.css"

export const metadata: Metadata = {
    title: "Jake's Portfolio",
    description: "A portfolio created by the one and only Jake Finlay.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" {...themeAttributes}>
            <body>
                <ThemeProvider>
                    {children}
                    {process.env.NODE_ENV === "development" && <DevThemeSwitcher />}
                </ThemeProvider>
            </body>
        </html>
    )
}
