import logoBrand from "../assets/logo-brand.png";
import backgroundImage from "../assets/hero-image-bg.png";
import logoBrandSecondary from "../assets/logo-brand-secondary.png";
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

const features = [
  {
    title: "Pemantauan Suhu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
    icon: (
      <svg
        width={48}
        height={86}
        viewBox="0 0 48 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 80C19.8893 80.0019 15.8929 78.6467 12.6311 76.145C9.36934 73.6432 7.02459 70.1347 5.96079 66.164C4.897 62.1933 5.17365 57.9825 6.74781 54.1851C8.32197 50.3877 11.1056 47.2162 14.6667 45.1627L16 44.3947V13.3333C15.9927 11.4464 16.6544 9.61793 17.8676 8.17267C19.0808 6.72741 20.7669 5.7589 22.6266 5.43915C24.4863 5.1194 26.3991 5.46911 28.0253 6.42615C29.6516 7.3832 30.886 8.88565 31.5093 10.6667H24V16H32V21.3333H24V26.6667H32V32H24V37.3333H32V44.3947L33.3333 45.1627C36.8944 47.2162 39.678 50.3877 41.2522 54.1851C42.8264 57.9825 43.103 62.1933 42.0392 66.164C40.9754 70.1347 38.6307 73.6432 35.3689 76.145C32.1071 78.6467 28.1107 80.0019 24 80ZM37.3333 41.376V13.3333C37.3333 9.79711 35.9286 6.40573 33.4281 3.90524C30.9276 1.40476 27.5362 0 24 0C20.4638 0 17.0724 1.40476 14.5719 3.90524C12.0714 6.40573 10.6667 9.79711 10.6667 13.3333V41.376C6.38548 44.2365 3.13772 48.398 1.40305 53.2458C-0.331618 58.0937 -0.461226 63.3709 1.03337 68.2981C2.52797 73.2253 5.56753 77.5412 9.70313 80.6084C13.8387 83.6756 18.8511 85.3315 24 85.3315C29.1489 85.3315 34.1613 83.6756 38.2969 80.6084C42.4325 77.5412 45.472 73.2253 46.9666 68.2981C48.4612 63.3709 48.3316 58.0937 46.597 53.2458C44.8623 48.398 41.6145 44.2365 37.3333 41.376Z"
          fill="#326765"
        />
        <path
          d="M23.9998 48C27.536 48 30.9274 49.4048 33.4279 51.9052C35.9284 54.4057 37.3331 57.7971 37.3331 61.3333C37.3331 64.8696 35.9284 68.2609 33.4279 70.7614C30.9274 73.2619 27.536 74.6667 23.9998 74.6667C20.4636 74.6667 17.0722 73.2619 14.5717 70.7614C12.0712 68.2609 10.6664 64.8696 10.6664 61.3333C10.6664 57.7971 12.0712 54.4057 14.5717 51.9052C17.0722 49.4048 20.4636 48 23.9998 48Z"
          fill="#326765"
        />
      </svg>
    ),
  },
  {
    title: "Pemantauan Kelembaban",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
    icon: (
      <svg
        width={75}
        height={86}
        viewBox="0 0 75 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.4512 71V49.3934H50.8658V63.2828H36.9658V71H33.4512ZM57.5854 71V49.3934H61.1001V57.4196H71.4853V49.3934H75V71H71.4853V60.9672H61.0961V71H57.5854ZM36.9658 59.7312H47.3511V53.1015H36.9658V59.7312ZM25.5083 70.8796C18.148 70.3044 12.0559 67.3213 7.23193 61.9304C2.41064 56.5341 0 49.9258 0 42.1056C0 36.3428 2.30077 29.9686 6.9023 22.9831C11.5038 15.9976 18.4697 8.33657 27.7998 0C36.8785 8.13324 43.7172 15.6016 48.3161 22.4052C52.915 29.2088 55.3429 35.4679 55.5997 41.1826V41.3672H25.5083V70.8796Z"
          fill="#326765"
        />
      </svg>
    ),
  },
  {
    title: "Pemantauan Level Air",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
    icon: (
      <svg
        width={80}
        height={86}
        viewBox="0 0 80 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 51C30.7241 51 24.8966 46.034 21.0079 41.3596C19.3799 39.4028 16.2719 39.4323 14.8474 41.5184C12.2537 45.3214 9.2308 48.829 3 50.2099M77 50.2099C71.1244 48.9102 68.1052 45.7201 65.604 42.1682C64.0352 39.9455 60.5905 40.0784 58.8885 42.2162C57.3715 44.1214 55.5622 45.8715 53.3755 47.3078M40 14.0779C49.2759 14.0779 55.1034 9.11189 58.9958 4.43755C60.6201 2.48068 63.7318 2.51022 65.1526 4.59632C67.7463 8.39929 70.7692 11.9069 77 13.2878M3 13.2878C8.8756 11.9881 11.8948 8.79805 14.396 5.24615C15.9611 3.02344 19.4095 3.16005 21.1078 5.29414C22.6248 7.19563 24.4378 8.94943 26.6245 10.3857M77 31.7488C71.1244 30.4492 68.1052 27.2591 65.604 23.7072C64.0352 21.4845 60.5905 21.6174 58.8885 23.7552C55.0035 28.6363 49.1945 32.539 40 32.539C30.7241 32.539 24.8966 27.5729 21.0079 22.8986C19.3799 20.9417 16.2719 20.9713 14.8474 23.0574C12.2537 26.8603 9.2308 30.3679 3 31.7488"
          stroke="#326765"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
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
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-[89px] pt-32">
          <div className="max-w-[665px]">
            <h1 className="text-[64px] font-semibold text-white">Selamat Datang di Pak Tani!</h1>
            <p className="text-[24px] text-white mt-2">Kelola dan pantau sistem irigasi pertanian Anda dengan mudah, langsung dari genggaman Anda.</p>

            <div className="mt-[46px]">
              <button className="px-12 py-2 h-[62px] font-bold text-[24px] text-[#326765] bg-white rounded-[15px]">Get Started</button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature */}
      <div className="mt-[87px]">
        <div className="container mx-auto px-[89px] flex flex-col">
          <div className="mx-auto w-[505px] text-center">
            <h2 className="text-[36px] font-semibold">Fitur - fitur</h2>
            <p className="text-[20px] text-[#7d7d7d]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </p>
          </div>
          <div className="grid grid-cols-3 mt-[61px] gap-[58px]">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white w-full h-[406px] rounded-[20px] px-[38px] pt-[59px]"
              >
                <div className="flex flex-col items-center gap-2">
                  {feature.icon}
                  <h3 className="font-semibold text-[24px] text-[#326765]">{feature.title}</h3>
                  <p className="text-[18px] leading-[24px] text-center text-[#7d7d7d]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-[245px] bg-[#4D7D7A] text-white h-[330px]">
        <div className="container mx-auto px-[89px] py-12 flex justify-between items-start">
          {/* Left Section */}
          <div>
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <img
                src={logoBrandSecondary}
                alt="PakTani Logo"
                className="size-[80px]"
              />
              <h2 className="text-[40px] font-bold">PakTani</h2>
            </div>
            <p className="mt-4 max-w-sm text-[16px]">Empowering farmers with digital tools to thrive in modern agriculture</p>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg
                width={26}
                height={26}
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width={26}
                  height={26}
                  fill="url(#pattern0_1173_119)"
                />
                <defs>
                  <pattern
                    id="pattern0_1173_119"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_1173_119"
                      transform="scale(0.01)"
                    />
                  </pattern>
                  <image
                    id="image0_1173_119"
                    width={100}
                    height={100}
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              <span className=" text-[16px]">@scituinsuka</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                width={26}
                height={26}
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width={26}
                  height={26}
                  fill="url(#pattern0_1173_126)"
                />
                <defs>
                  <pattern
                    id="pattern0_1173_126"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_1173_126"
                      transform="scale(0.01)"
                    />
                  </pattern>
                  <image
                    id="image0_1173_126"
                    width={100}
                    height={100}
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACpUlEQVR4nO3dPWjUYADG8aufIAgFXRQqaAcdBUGoTro7SdeOro6ujq6Oro5dHG5QF3UVCjfoopOgATs4iD1djH8JJNAGrLz5ep+8eX6Q8bjm/nBPkww3m5mZmZmZmZmZmZmZmU0csAFs+qCLY6OLINtYV7YdRIuDiHEQMQ4ixkHEOEiKQc4BT2OfSQLmwIXWQfaFuQN8in1WI5QVF4WdhahFOQU8An7HPssRyIEnwOleYtTCXAXexj5jYQvgeu8halGOAPeA77HPXsgSeAAcHTRGLYxHv4/RbmvCo5/1NtptTWz088FGu/Yh3wVWA19zDdghXTvFOQZ+JqvFZxkc4B9X6l+BrcDXpTj6yyajXX6df+7j1skr4PJER38eOtrAReB53/eyfgIPgRMTGf0sdLSBY8B94MeQNxc/ALcSHv28yWgDN4B3se72/im/js4kdqW/CL3SLkf7cRky+u33VEZ/2XK05Z6HvG4w+udFRn/eYLQv1UZb8gFVNfonRzL6WYejLf3EsBj928Kjnzcc7ZuHjLb8I1zV0V/0NNryQdRGf9litL908P4yQRRGfz7AaI8uSIzRzxqM9vFytPc6PnfJIEONfh5htEcdZP/on+149BeRRnv0QQ6MPrDScvRjj3YyQSovgfXAv28NeFYea4GvXS/fcyijC9J49EVGO8kglY+hox8w2u+JY9RBGo9+xNFOPkjlWzngKw3PYbP8xyG2ZIJU3gBXAq+0X6AjuSCFX/8b/YijPckgh45+5NGedJADoy8y2kw9SGW3PNRNJshYOIgYBxHjIGIcRIyDiHEQMQ4ixkHEOIgYBxHjIGIcRIyDiHEQMQ4ixkHEOIgYBxHjIGIcRIyDiHEQMQ6SYhD/5BFCP3lkZmZmZmZmZmZmZmY2G7e/+TjiNpDaGK4AAAAASUVORK5CYII="
                  />
                </defs>
              </svg>

              <span className=" text-[16px]">scit.uinsuka@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="container mx-auto px-[89px] pb-6">
          <p className="text-[12px] text-right font-bold">&copy; {new Date().getFullYear()} PakTani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
