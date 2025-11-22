import { Outlet } from "react-router";

import { LandingPageHeader } from "../features/landing-page/components/landing-page-header";
import { LandingPageFooter } from "../features/landing-page/components/landing-page-footer";

export const LandingPageLayout = () => {
  return (
    <>
      <LandingPageHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <LandingPageFooter />
    </>
  );
};
