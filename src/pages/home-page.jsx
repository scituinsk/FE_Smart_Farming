import logoBrand from "../assets/logo-brand.png";
import backgroundImage from "../assets/hero-image-bg.png";
import { Link } from "react-router";

import { cn } from "../utils/cn.js";

const navItems = [
  {
    label: "Home",
    href: "/",
    isActive: true,
  },
  {
    label: "How It Works",
    href: "/how-it-works",
    isActive: false,
  },
  {
    label: "Contact",
    href: "/contact",
    isActive: false,
  },
];

export const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="bg-white h-[143px] flex items-center">
        <div className="container px-[89px]  mx-auto  py-6 flex items-center justify-between">
          <img
            src={logoBrand}
            alt="LOGO BRAND"
          />
          <div className="flex space-x-8 ">
            {navItems.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                className={cn("text-[24px]", item.isActive ? "text-[#326765] font-bold" : "text-black")}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="text-[24px]">
            <button className="px-4 py-2 font-bold text-[#326765] mr-[29px]">Sign Up</button>
            <button className="px-12 py-2 h-[62px] font-bold text-white bg-[#326765] rounded-[15px]">Log In</button>
          </div>
        </div>
      </header>
      {/* Hero */}
      <div
        className="bg-gray-100 h-[712px]"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
      >
        <div className="pt-32 ps-[89px]  max-w-[665px]">
          <h1 className="text-[64px] font-semibold text-white">Selamat Datang di Pak Tani!</h1>
          <p className="text-[24px]  text-white mt-2">Kelola dan pantau sistem irigasi pertanian Anda dengan mudah, langsung dari genggaman Anda.</p>

          <div className="mt-[46px]">
            <button className="px-12 py-2 h-[62px] font-bold text-[24px] text-[#326765] bg-white rounded-[15px]">Get Started</button>
          </div>
        </div>
      </div>
      {/* Feature */}
      {/* Footer */}
    </div>
  );
};
