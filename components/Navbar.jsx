"use client";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-gray-200">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <HiOutlineGlobeAlt className="h-6 w-6" />
          <span className="pl-2">Football League</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 relative items-center">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-sm font-medium hover:underline underline-offset-4 focus:outline-none"
            >
              View Details
            </button>
            {isOpen && (
              <div className="absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Link
                    href="/playerList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Players
                  </Link>
                  <Link
                    href="/refereeList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Referees
                  </Link>
                  <Link
                    href="/stadiumList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Stadiums
                  </Link>
                  <Link
                    href="/teamList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Teams
                  </Link>
                  <Link
                    href="/matchList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Matches
                  </Link>
                  <Link
                    href="/managerList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Managers
                  </Link>
                  <Link
                    href="/matchLeagueList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Leagues
                  </Link>
                  <Link
                    href="/matchCupsList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Cups
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Testimonials
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
    </nav>
  );
}
