// Navbar.jsx

"use client";
import Link from "next/link";
import { Router } from "next/router";
import { useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFeaturesClick = (e) => {
    const isAuthenticated = useAuth();
    if (!isAuthenticated) {
      Router.push("/userLogin");
    }
    e.preventDefault();
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
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
                    onClick={toggleDropdown}
                    href="/sportsmanList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Sportsmen
                  </Link>
                  <Link
                    onClick={toggleDropdown}
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
                    onClick={toggleDropdown}
                    href="/stadiumList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Stadiums
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/teamList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Teams
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/matchList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Matches
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/managerList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Managers
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/matchLeagueList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Leagues
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/matchCupsList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Cups
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/cityList"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                    prefetch={false}
                  >
                    Cities
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/aboutUs"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About Us
          </Link>
          <Link
            href="#"
            onClick={handleFeaturesClick}
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
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
