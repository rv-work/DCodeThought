import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      {/* Login Card */}
      <div className="w-full max-w-md animate-scale-in">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-accent to-purple-500 text-white text-2xl font-bold shadow-2xl mb-4">
            D
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome Back
          </h1>
          <p className="text-muted text-lg">
            Login to continue your coding journey
          </p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-accent to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

          {/* Main Card */}
          <div className="relative card animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <LoginForm />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 py-1 rounded bg-background-secondary text-muted">
                  New to DCodeThought?
                </span>
              </div>
            </div>

            {/* Signup Link */}
            <Link
              href="/signup"
              className="block w-full text-center px-6 py-3 rounded-xl border-2 border-border-subtle hover:border-accent bg-background-tertiary hover:bg-background text-foreground font-medium transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <span className="flex items-center justify-center gap-2">
                Create an account
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-3 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <Link href="/about" className="hover:text-accent transition-colors cursor-pointer">
              About
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-accent transition-colors cursor-pointer">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-accent transition-colors cursor-pointer">
              Terms
            </Link>
          </div>
          <p className="text-xs text-muted">
            © 2024 DCodeThought. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}