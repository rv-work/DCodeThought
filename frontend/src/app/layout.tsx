import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "DCodeThought",
  description: "Java-first LeetCode explanations",
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
      </body>
    </html >
  );
}
