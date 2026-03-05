import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DCodeThought | Decode the Logic",
  description: "Thought-first LeetCode explanations with multi-language solutions (C++, Java, Python)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-(--bg)">
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
              <AuthProvider>
                {children}
              </AuthProvider>
            </GoogleOAuthProvider>
          </div>
        </ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
            },
          }}
        />
      </body>
    </html >
  );
}