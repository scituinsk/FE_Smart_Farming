import { useState } from "react";
import { Link, useLocation } from "react-router";

import { CORE_APP_NAV_ITEMS } from "../../../constants/core-app-config";

import { cn } from "../../../utils/cn";
import { generateGreetings } from "../../../utils/generate-greetings";

import { AppLogo } from "../../../components/app-logo";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

export const CoreAppHeader = () => {
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
    <header className=" h-auto  flex items-center relative shadow-md xl:shadow-none z-50">
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
                "block w-full h-1 rounded-2xl  bg-gray-700 absolute left-0 transform transition duration-300 ease-in-out",
                isMenuOpen
                  ? "top-1/2 rotate-45 -translate-y-1/2" // Pindah ke tengah lalu putar
                  : "top-1.5" // Posisi garis atas
              )}
            ></span>
            <span
              className={cn(
                "block w-full h-1 rounded-2xl  bg-gray-700 absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out",
                isMenuOpen ? "opacity-0" : "opacity-100" // Sembunyikan garis tengah
              )}
            ></span>
            <span
              className={cn(
                "block w-full h-1 rounded-2xl  bg-gray-700 absolute left-0 transform transition duration-300 ease-in-out",
                isMenuOpen
                  ? "top-1/2 -rotate-45 -translate-y-1/2" // Pindah ke tengah lalu putar
                  : "bottom-1.5" // Posisi garis bawah
              )}
            ></span>
          </button>
        </div>

        {/* Navigasi Desktop */}
        <div className="hidden xl:flex items-center space-x-8">
          {CORE_APP_NAV_ITEMS.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className={cn("text-[20px]", getIsActivePath(item.href) ? "text-[#326765] font-bold" : "text-black")}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden xl:flex items-center ">
          <Avatar>
            <AvatarImage src="/avatar-example.jpg" />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <div className="flex-col flex ml-5">
            <span className="text-xs">{generateGreetings()}</span>
            <span className="font-bold">Kernessstra</span>
          </div>
          <div className="bg-white size-13 rounded-full ml-5 flex items-center justify-center">
            <svg
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="31.2"
                height="31.2"
                transform="translate(0.399902 0.400391)"
                fill="none"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3322 4.68356C17.3037 4.33474 16.21 4.22107 15.1317 4.35092C14.0534 4.48077 13.018 4.85083 12.1017 5.43385C11.1853 6.01688 10.4115 6.79801 9.83702 7.71974C9.26258 8.64146 8.9022 9.6803 8.78242 10.7598L8.45482 13.7069L8.44702 13.781C8.27918 15.2422 7.80331 16.6512 7.05082 17.915L7.01182 17.98L6.26172 19.2319C5.57922 20.3681 5.23862 20.9362 5.31272 21.4029C5.36167 21.7126 5.52096 21.9943 5.76122 22.1959C6.12392 22.5001 6.78692 22.5001 8.11162 22.5001H23.8884C25.2144 22.5001 25.8774 22.5001 26.2388 22.1972C26.4798 21.9955 26.6396 21.7133 26.6886 21.4029C26.7614 20.9362 26.4208 20.3681 25.7396 19.2319L24.9869 17.9787L24.9479 17.9137C24.3559 16.9189 23.9341 15.8324 23.6999 14.6988C22.5411 14.6811 21.408 14.3538 20.4182 13.751C19.4283 13.1481 18.6177 12.2915 18.0702 11.27C17.5227 10.2485 17.2583 9.09918 17.3043 7.94111C17.3504 6.78304 17.7053 5.65835 18.3322 4.68356ZM21.5562 6.88576C22.4763 7.9769 23.0534 9.31564 23.215 10.7338C22.8175 10.6421 22.4472 10.4581 22.1339 10.1968C21.8207 9.9355 21.5733 9.60415 21.4118 9.22954C21.2503 8.85493 21.1793 8.44758 21.2044 8.04042C21.2294 7.63326 21.35 7.23771 21.5562 6.88576Z"
                fill="#326765"
              />
              <path
                d="M12.1001 22.5C12.1001 23.5343 12.511 24.5263 13.2424 25.2577C13.9738 25.9891 14.9658 26.4 16.0001 26.4C17.0344 26.4 18.0264 25.9891 18.7578 25.2577C19.4892 24.5263 19.9001 23.5343 19.9001 22.5H12.1001Z"
                fill="#326765"
              />
              <path
                d="M23.7998 11.4502C25.5947 11.4502 27.0498 9.99512 27.0498 8.2002C27.0498 6.40527 25.5947 4.9502 23.7998 4.9502C22.0049 4.9502 20.5498 6.40527 20.5498 8.2002C20.5498 9.99512 22.0049 11.4502 23.7998 11.4502Z"
                fill="#326765"
                stroke="#326765"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu  */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white shadow-lg xl:hidden z-20 transform transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        )}
      >
        <div className="flex flex-col items-center py-4">
          {CORE_APP_NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "w-full text-left px-6 py-4 text-lg border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50",
                getIsActivePath(item.href) ? "text-[#326765] font-bold bg-gray-50" : "text-black"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex xl:hidden items-center py-4 px-6">
          {/* Avatar */}
          <Avatar>
            <AvatarImage src="/avatar-example.jpg" />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>

          {/* Nama & Sapaan */}
          <div className="flex flex-col ml-4">
            <span className="text-xs text-gray-500">{generateGreetings()}</span>
            <span className="font-bold text-gray-800">Kernessstra</span>
          </div>

          {/* Icon */}
          <div className="ml-auto bg-white w-12 h-12 rounded-full flex items-center justify-center">
            <svg
              width={28}
              height={28}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="31.2"
                height="31.2"
                transform="translate(0.399902 0.400391)"
                fill="none"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3322 4.68356C17.3037 4.33474 16.21 4.22107 15.1317 4.35092C14.0534 4.48077 13.018 4.85083 12.1017 5.43385C11.1853 6.01688 10.4115 6.79801 9.83702 7.71974C9.26258 8.64146 8.9022 9.6803 8.78242 10.7598L8.45482 13.7069L8.44702 13.781C8.27918 15.2422 7.80331 16.6512 7.05082 17.915L7.01182 17.98L6.26172 19.2319C5.57922 20.3681 5.23862 20.9362 5.31272 21.4029C5.36167 21.7126 5.52096 21.9943 5.76122 22.1959C6.12392 22.5001 6.78692 22.5001 8.11162 22.5001H23.8884C25.2144 22.5001 25.8774 22.5001 26.2388 22.1972C26.4798 21.9955 26.6396 21.7133 26.6886 21.4029C26.7614 20.9362 26.4208 20.3681 25.7396 19.2319L24.9869 17.9787L24.9479 17.9137C24.3559 16.9189 23.9341 15.8324 23.6999 14.6988C22.5411 14.6811 21.408 14.3538 20.4182 13.751C19.4283 13.1481 18.6177 12.2915 18.0702 11.27C17.5227 10.2485 17.2583 9.09918 17.3043 7.94111C17.3504 6.78304 17.7053 5.65835 18.3322 4.68356ZM21.5562 6.88576C22.4763 7.9769 23.0534 9.31564 23.215 10.7338C22.8175 10.6421 22.4472 10.4581 22.1339 10.1968C21.8207 9.9355 21.5733 9.60415 21.4118 9.22954C21.2503 8.85493 21.1793 8.44758 21.2044 8.04042C21.2294 7.63326 21.35 7.23771 21.5562 6.88576Z"
                fill="#326765"
              />
              <path
                d="M12.1001 22.5C12.1001 23.5343 12.511 24.5263 13.2424 25.2577C13.9738 25.9891 14.9658 26.4 16.0001 26.4C17.0344 26.4 18.0264 25.9891 18.7578 25.2577C19.4892 24.5263 19.9001 23.5343 19.9001 22.5H12.1001Z"
                fill="#326765"
              />
              <path
                d="M23.7998 11.4502C25.5947 11.4502 27.0498 9.99512 27.0498 8.2002C27.0498 6.40527 25.5947 4.9502 23.7998 4.9502C22.0049 4.9502 20.5498 6.40527 20.5498 8.2002C20.5498 9.99512 22.0049 11.4502 23.7998 11.4502Z"
                fill="#326765"
                stroke="#326765"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
