export const inputCls =
  "w-full bg-background border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium";

export const cardCls =
  "bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-3xl p-5 relative overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:-translate-y-0.5";

export const sidebarCardCls =
  "bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-3xl p-5 relative overflow-hidden";

export interface LightboxState {
  imgs: string[];
  index: number;
}
