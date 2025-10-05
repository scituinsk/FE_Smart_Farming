import { useState } from "react";
import { Link, useLocation } from "react-router";

import { cn } from "../../../utils/cn";

import { Button } from "../../../components/ui/button";
import { AppLogo } from "../../../components/app-logo";
import { NAV_ITEMS } from "../../../constants/landing-page-config";

export const LandingPageHeader = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getIsActivePath = (path) => {
    // Memberi perlakuan khusus untuk homepage ("/") agar tidak selalu aktif
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-text-invers h-auto flex items-center relative shadow-md xl:shadow-none z-50">
      <div className="container px-6 xl:px-[89px] mx-auto py-4 xl:py-6 flex items-center justify-between">
        <AppLogo />

        {/* Hamburger Menu Button */}
        <div className="xl:hidden flex items-center h-full">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 z-50" // Container relatif untuk garis absolut
            aria-label="Toggle Menu"
          >
            <span
              className={cn(
                "block w-full h-1 rounded-2xl  bg-text absolute left-0 transform transition duration-300 ease-in-out",
                isMenuOpen
                  ? "top-1/2 rotate-45 -translate-y-1/2" // Pindah ke tengah lalu putar
                  : "top-1.5", // Posisi garis atas
              )}
            ></span>
            <span
              className={cn(
                "block w-full h-1 rounded-2xl  bg-text absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out",
                isMenuOpen ? "opacity-0" : "opacity-100", // Sembunyikan garis tengah
              )}
            ></span>
            <span
              className={cn(
                "block w-full h-1 rounded-2xl  bg-text absolute left-0 transform transition duration-300 ease-in-out",
                isMenuOpen
                  ? "top-1/2 -rotate-45 -translate-y-1/2" // Pindah ke tengah lalu putar
                  : "bottom-1.5", // Posisi garis bawah
              )}
            ></span>
          </button>
        </div>

        {/* Navigasi Desktop */}
        <div className="hidden xl:flex items-center space-x-8">
          {NAV_ITEMS.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className={cn(
                "text-xl transition-colors duration-200 hover:text-primary",
                getIsActivePath(item.href)
                  ? "text-primary font-bold"
                  : "text-black",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden xl:flex items-center ">
          <Button variant="ghost" size="lg" className="mr-[29px] text-primary">
            Sign Up
          </Button>
          <Button variant="primary" size="lg">
            Log In
          </Button>
        </div>
      </div>

      {/* Mobile Menu  */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-text-invers shadow-lg xl:hidden z-20 transform transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible",
        )}
      >
        <div className="flex flex-col items-center py-4">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "w-full text-center py-4 text-lg  transition-colors duration-200 hover:text-primary",
                getIsActivePath(item.href)
                  ? "text-primary font-bold"
                  : "text-black",
              )}
              style={{
                transitionDelay: `${isMenuOpen ? index * 50 : 0}ms`,
                transitionProperty: "opacity, transform",
                transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col items-center w-full space-y-4 pt-6 px-6">
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-primary text-lg"
            >
              Sign Up
            </Button>
            <Button variant="primary" size="lg" className="w-full text-lg ">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
