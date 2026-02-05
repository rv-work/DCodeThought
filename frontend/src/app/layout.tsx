import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "DCodeThought",
  description: "LeetCode POTD, Contests & Solutions Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">

            {/* 🔥 NAVBAR ADDED HERE */}
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>

            {/* Footer add later */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
