"use client";

import { useState } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { ChevronRight, BrainCircuit, Code2, Terminal, Zap } from "lucide-react";

type TabType = "thought" | "code";

interface CodeSnippet {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TabType>("thought");

  const snippets: CodeSnippet[] = [
    {
      id: "thought",
      label: "Intuition",
      icon: <BrainCircuit className="w-4 h-4" />,
      content: (
        <div className="space-y-3 font-mono text-sm text-emerald-400">
          <p className="text-muted/70 italic">
            {"// Step 1: Analyze the constraint"}
          </p>
          <p>Array is sorted. Need O(1) space.</p>

          <p className="text-muted/70 italic mt-3">
            {"// Step 2: Formulate the logic"}
          </p>
          <p className="text-blue-400">Two Pointers Approach:</p>

          <ul className="list-disc pl-5 space-y-1 text-purple-300">
            <li>Left pointer at index 0</li>
            <li>Right pointer at n - 1</li>
            <li>If sum == target, return [L, R]</li>
            <li>If sum &gt; target, R--</li>
            <li>Else L++</li>
          </ul>
        </div>
      ),
    },
    {
      id: "code",
      label: "Solution.cpp",
      icon: <Code2 className="w-4 h-4" />,
      content: (
        <div className="space-y-1 font-mono text-sm">
          <p className="text-pink-500">
            class <span className="text-blue-400">Solution</span> {"{"}
          </p>
          <p className="text-pink-500 pl-4">public:</p>

          <p className="pl-8">
            <span className="text-purple-400">vector</span>&lt;
            <span className="text-orange-400">int</span>&gt;{" "}
            <span className="text-blue-400">twoSum</span>(
            <span className="text-purple-400">vector</span>&lt;
            <span className="text-orange-400">int</span>&gt;&amp; nums,{" "}
            <span className="text-orange-400">int</span> target) {"{"}
          </p>

          <p className="pl-12 text-orange-400">
            int <span className="text-foreground">l = 0, r = nums.size() - 1;</span>
          </p>

          <p className="pl-12 text-pink-500">
            while <span className="text-foreground">(l &lt; r) {"{"}</span>
          </p>

          <p className="pl-16 text-emerald-400">
            <span className="text-pink-500">if</span> (nums[l] + nums[r] == target)
            <span className="text-pink-500"> return</span> {"{l, r};"}
          </p>

          <p className="pl-16 text-emerald-400">
            <span className="text-pink-500">else if</span> (nums[l] + nums[r] &lt; target) l++;
          </p>

          <p className="pl-16 text-emerald-400">
            <span className="text-pink-500">else</span> r--;
          </p>

          <p className="pl-12 text-foreground">{"}"}</p>

          <p className="pl-12 text-pink-500">
            return <span className="text-foreground">{"{};"}</span>
          </p>

          <p className="pl-8 text-foreground">{"}"}</p>
          <p className="text-foreground">{"};"}</p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-20 pb-16 lg:pt-0 lg:pb-0">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-[10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
              DCodeThought Ecosystem Live
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Code the <br />
              <span className="relative">
                <span className="absolute -inset-1 rounded-lg bg-linear-to-r from-purple-500/20 to-blue-500/20 blur-lg"></span>
                <span className="relative bg-linear-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Intuition
                </span>
              </span>
              <br /> Not Just Syntax.
            </h1>

            <p className="text-lg text-muted leading-relaxed">
              The only platform that builds your brain before it builds your code.
              Earn reputation, build streaks, and rank on multi-tier leaderboards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/problems"
                className="group px-8 py-4 rounded-2xl bg-foreground text-background font-bold text-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Terminal className="w-5 h-5" />
                Start Solving
              </Link>

              <Link
                href="/potd"
                className="group px-8 py-4 rounded-2xl border-2 border-border-subtle bg-background/50 font-bold text-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-purple-500" />
                Today&apos;s POTD
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* RIGHT - TILT CARD */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto">

            {/* 🔥 FLOATING BADGES */}
            <div className="absolute -top-6 -right-6 z-30 bg-background-secondary border border-border-subtle p-3 rounded-2xl shadow-2xl animate-bounce">
              <p className="text-xs font-bold text-emerald-400">O(N) Time</p>
              <p className="text-[10px] text-muted">Optimized</p>
            </div>

            <div className="absolute -bottom-6 -left-6 z-30 bg-background-secondary border border-border-subtle p-3 rounded-2xl shadow-2xl animate-bounce [animation-delay:1s]">
              <p className="text-xs font-bold text-purple-400">Best Thinker</p>
              <p className="text-[10px] text-muted">Creative Tag</p>
            </div>

            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              transitionSpeed={800}
              scale={1.02}
              glareEnable={true}
              glareMaxOpacity={0.15}
              className="rounded-2xl"
            >
              <div className="rounded-2xl bg-[#0d0d12] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">

                {/* Header */}
                <div className="bg-[#1a1a24] border-b border-white/5 px-4 py-3 flex justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>

                  <div className="flex bg-[#0d0d12] p-1 rounded-lg">
                    {snippets.map((snippet) => (
                      <button
                        key={snippet.id}
                        onClick={() => setActiveTab(snippet.id)}
                        className={`px-3 py-1.5 text-xs rounded-md ${activeTab === snippet.id
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-muted/60"
                          }`}
                      >
                        {snippet.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 h-80 overflow-y-auto">
                  {snippets.find((s) => s.id === activeTab)?.content}
                </div>

              </div>
            </Tilt>

            <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 to-cyan-500/20 blur-3xl -z-10 rounded-[3rem]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}