import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-32 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-2xl p-8 shadow-2xl animate-scale-in">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-muted mb-8">Login to continue your journey</p>

        {/* Form */}
        <LoginForm />

        {/* Switch to Signup */}
        <p className="text-center text-sm text-muted mt-6">
          New here?{" "}
          <Link
            href="/signup"
            className="text-accent font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
