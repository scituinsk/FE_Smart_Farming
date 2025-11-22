import { Link } from "react-router";
import backgroundImage from "../../assets/hero-image-bg-compressed.png";

import { Button } from "../../components/ui/button";
import { FEATURES } from "../../constants/landing-page-config.jsx";
import { Blurhash } from "react-blurhash";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [loaded, setLoaded] = useState(false);

  const HERO_BLURHASH = "LlI#fGM{tQn~O[NJnPR,_4V[kVae";

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[712px] flex items-center overflow-hidden">
        {/* Blurhash sebagai placeholder */}
        {!loaded && (
          <div className="absolute inset-0 w-full h-full">
            <Blurhash
              hash={HERO_BLURHASH}
              width={"100%"}
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        )}

        {/* Background image utama */}
        <div
          className={`absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        {/* Konten hero */}
        <div className="container relative mx-auto px-6 lg:px-[89px] pt-0 lg:pt-32 z-10">
          <div className="max-w-full lg:max-w-[665px] text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-invers">
              Selamat Datang di Pak Tani!
            </h1>
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
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
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
