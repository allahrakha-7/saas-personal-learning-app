"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Learning Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const Navitems = () => {
  const pathname = usePathname();
  return (
    <>
    <nav className="flex flex-col md:flex-row md:items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "text-gray-600 hover:text-primary transition-colors ",
            pathname === href && "text-primary font-medium"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
    </>
  );
};

export default Navitems;
