"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Navitems from "./Navitems";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width={46} height={44} />
            <span className="font-bold text-lg">Learnuity</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Navitems />
            <p className="cursor-pointer hover:text-primary">Sign In</p>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col items-start gap-4 p-4">
            <Navitems />
            <p className="cursor-pointer hover:text-primary">Sign In</p>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
