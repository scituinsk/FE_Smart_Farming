import logoBrandSecondary from "../../../assets/logo-brand-secondary.png";

export const LandingPageFooter = () => {
  return (
    <footer className="mt-16 lg:mt-[245px] bg-[#4D7D7A] text-white h-auto">
      <div className="container mx-auto px-6 lg:px-[89px] py-12 flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left">
        {/* Left Section */}
        <div className="mb-8 lg:mb-0">
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            {/* Logo */}
            <img
              src={logoBrandSecondary}
              alt="PakTani Logo"
              className="size-[60px] lg:size-[80px]"
            />
            <h2 className="text-3xl lg:text-[40px] font-bold">PakTani</h2>
          </div>
          <p className="mt-4 max-w-sm text-sm lg:text-[16px]">Empowering farmers with digital tools to thrive in modern agriculture</p>
        </div>

        {/* Right Section */}
        <div className="space-y-4 flex flex-col items-center lg:items-start">
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

            <span className="text-sm lg:text-[16px]">@scituinsuka</span>
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

            <span className="text-sm lg:text-[16px]">scit.uinsuka@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto px-6 lg:px-[89px] pb-6">
        <p className="text-[12px] text-center lg:text-right font-bold">&copy; {new Date().getFullYear()} PakTani. All rights reserved.</p>
      </div>
    </footer>
  );
};
