import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/potd", label: "POTD" },
  { href: "/contests", label: "Contests" },
  { href: "/requests", label: "Requests" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                ? "text-accent"
                : "text-muted hover:text-foreground hover:bg-background-tertiary"
              }`}
          >
            {link.label}
            {/* Active indicator */}
            {active && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-accent to-purple-500 rounded-full"></span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}