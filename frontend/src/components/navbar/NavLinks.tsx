import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/potd", label: "POTD" },
  { href: "/contests", label: "Contests" },
  { href: "/requests", label: "Requests" },
];

export default function NavLinks() {
  return (
    <nav className="flex gap-4 text-sm">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="hover:underline"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
