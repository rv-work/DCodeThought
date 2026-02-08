import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-32 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-2xl p-8 shadow-2xl animate-scale-in">

        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-muted mb-8">Join the DCodeThought family</p>

        <SignupForm />

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
