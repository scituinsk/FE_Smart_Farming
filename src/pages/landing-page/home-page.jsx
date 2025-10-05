import { Link } from "react-router";
import backgroundImage from "../../assets/hero-image-bg.png";

import { Button } from "../../components/ui/button";
import { FEATURES } from "../../constants/landing-page-config.jsx";

export const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <div
        className="bg-surface h-[500px] md:h-[600px] lg:h-[712px] flex items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 lg:px-[89px] pt-0 lg:pt-32">
          <div className="max-w-full lg:max-w-[665px] text-center lg:text-left">
            {/* Penyesuaian font H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-invers">
              Selamat Datang di Pak Tani!
            </h1>
            {/* Penyesuaian font Paragraf */}
            <p className="text-base md:text-lg lg:text-xl text-text-invers mt-2">
              Kelola dan pantau sistem irigasi pertanian Anda dengan mudah,
              langsung dari genggaman Anda.
            </p>

            <div className="mt-8 lg:mt-[46px]">
              <Button
                asChild
                className="h-auto lg:h-14 px-10 text-md md:text-lg lg:text-xl text-primary bg-surface hover:bg-primary hover:text-surface"
              >
                <Link to="/app/dashboard">Mulai Sekarang</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature */}
      <div className="py-16 lg:mt-[87px] lg:py-0">
        <div className="container mx-auto px-6 lg:px-[89px] flex flex-col">
          <div className="mx-auto w-full lg:w-[505px] text-center">
            {/* Penyesuaian font H2 */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Fitur - fitur
            </h2>
            {/* Penyesuaian font Paragraf */}
            <p className="text-sm md:text-base lg:text-lg text-title-secondary mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 lg:mt-[61px] gap-8 lg:gap-[58px]">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="bg-white w-full h-auto rounded-[20px] px-6 py-10 lg:px-[38px] lg:pt-[59px] shadow-md flex justify-center"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  {feature.icon}
                  {/* Penyesuaian font H3 di dalam kartu */}
                  <h3 className="font-semibold text-xl lg:text-2xl text-primary mt-2">
                    {feature.title}
                  </h3>
                  {/* Penyesuaian font Paragraf di dalam kartu */}
                  <p className="text-base leading-relaxed lg:leading-[24px] text-center text-title-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
