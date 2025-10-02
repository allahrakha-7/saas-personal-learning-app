"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
              <SignedOut>
                <SignInButton>
                  <button className="border border-black rounded-4xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
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

              <SignedOut>
                <SignInButton>
                  <p className="cursor-pointer hover:text-primary">Sign In</p>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton />
                  <span>Profile</span>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
