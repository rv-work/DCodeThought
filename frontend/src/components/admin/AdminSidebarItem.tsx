// components/admin/AdminSidebarItem.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function AdminSidebarItem({ href, label }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded text-sm cursor-pointer
        ${active
          ? "bg-gray-200 text-white dark:bg-gray-800 font-semibold"
          : "hover:bg-gray-100 hover:text-white dark:hover:bg-gray-900"}
      `}
    >
      {label}
    </Link>
  );
}
