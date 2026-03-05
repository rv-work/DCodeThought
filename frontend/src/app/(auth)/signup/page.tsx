import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/auth/SignupForm";
import { ArrowRight, BrainCircuit, Code2, Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex bg-background">

      {/* =========================================
          LEFT PANEL (Branding & "Kuch Kuch")
          Hidden on mobile, takes 50% width on desktop
      ========================================= */}
      <div className="hidden lg:flex relative w-1/2 bg-background-secondary/30 border-r border-border-subtle overflow-hidden flex-col justify-between p-12">

        {/* Left Panel Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-600/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3 animate-fade-in">
          <div className="w flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="DCodeThought Logo"
              width={50}
              height={50}
              className="drop-shadow-lg rounded-md"
            />
          </div>
          <span className="text-xl font-bold tracking-wide">DCodeThought</span>
        </div>

        {/* Middle Content (The "Kuch Kuch") */}
        <div className="relative z-10 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your Journey
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-foreground">
            Learn the Logic. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">
              Nail the Interview.
            </span>
          </h1>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            Join the community of developers mastering LeetCode. Get daily problems, deep intuition-first explanations, and multi-language code.
          </p>

          {/* Floating Feature Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background-secondary border border-border-subtle shadow-sm">
              <Code2 className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-sm">C++, Java, Python</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background-secondary border border-border-subtle shadow-sm">
              <BrainCircuit className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-sm">Intuition First</span>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex -space-x-3 mb-3">
            {["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500"].map((gradient, i) => (
              <div key={i} className={`w-10 h-10 rounded-full bg-linear-to-br ${gradient} border-2 border-background flex items-center justify-center text-white text-xs font-bold z-${30 - i * 10}`}>
                👤
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-muted">
            Join <span className="text-foreground font-bold">500+</span> developers learning daily
          </p>
        </div>
      </div>

      {/* =========================================
          RIGHT PANEL (The Signup Form)
          Takes 100% on mobile, 50% on desktop
      ========================================= */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

        {/* Mobile-only background glow */}
        <div className="lg:hidden absolute top-[-10%] right-[-10%] w-75 h-75 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="w-full max-w-md animate-scale-in z-10">

          {/* Mobile-only Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-md mb-4">
              <Image src="/icon.png" alt="Logo" width={40} height={40} className="drop-shadow-lg" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2 text-foreground">Create Account</h1>
            <p className="text-muted">Join the DCodeThought family today</p>
          </div>

          <div className="relative group">
            {/* Form Card Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

            {/* Main Form Card */}
            <div className="relative rounded-3xl bg-background-secondary/60 backdrop-blur-xl border border-border-subtle p-6 md:p-10 shadow-2xl animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>

              <SignupForm />

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-subtle/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 py-1 rounded-full bg-background-secondary border border-border-subtle text-muted font-medium">
                    Already a member?
                  </span>
                </div>
              </div>

              <Link
                href="/login"
                className="group flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl border border-border-subtle bg-background/50 hover:bg-purple-500/5 hover:border-purple-500/30 text-foreground font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              >
                Login to your account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 text-purple-500 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-10 text-center space-y-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs text-muted font-medium leading-relaxed">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                Privacy Policy
              </Link>
            </p>
            <p className="text-xs text-muted opacity-80">
              © 2026 DCodeThought. All rights reserved.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}