import Link from 'next/link';
import { Swords, Hammer, ArrowLeft } from 'lucide-react';

const BattlePage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 w-full">

      {/* Animated Icon Container */}
      <div className="relative mb-8 group">
        {/* Background Glow - Red/Orange for Battle Vibe */}
        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full group-hover:bg-red-500/40 transition-all duration-700"></div>

        {/* Main Icon */}
        <div className="relative bg-background-secondary/40 border border-border-subtle p-6 rounded-full backdrop-blur-xl shadow-2xl">
          <Swords className="w-12 h-12 text-red-500 animate-pulse" />
        </div>

        {/* Floating Construction/Forging Badge */}
        <div className="absolute -top-2 -right-2 bg-background p-2 rounded-full border border-border-subtle shadow-lg animate-bounce">
          <Hammer className="w-5 h-5 text-orange-400" />
        </div>
      </div>

      {/* Typography */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-400 to-yellow-500">
        The Arena is Being Forged!
      </h1>

      <p className="text-muted text-base md:text-lg max-w-md mb-10 leading-relaxed">
        Sharpen your logic. Live Battles (1v1 and Squads) are currently under heavy construction and will be live very soon. Get ready to code for glory!
      </p>

      {/* Back to Safety Button */}
      <Link
        href="/challenges"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-red-500/50 transition-all duration-300 text-sm font-bold text-foreground group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Challenges
      </Link>

    </div>
  );
}

export default BattlePage;