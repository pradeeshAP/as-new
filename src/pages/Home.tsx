import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FinalCta } from "../components/FinalCta";
import { Hero } from "../components/Hero";
import { Industries } from "../components/Industries";
import { SelectedWork } from "../components/SelectedWork";
import { Solutions } from "../components/Solutions";
import { TechStack } from "../components/TechStack";
import { TrustStrip } from "../components/TrustStrip";
import { WhyChooseUs } from "../components/WhyChooseUs";

export function Home() {
  const location = useLocation();

  // Cross-page anchor links (e.g. from the Contact page, "/#solutions") land here as a
  // full navigation with a hash already in the URL — scroll to that section once mounted.
  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <Industries />
      <Solutions />
      <WhyChooseUs />
      <TechStack />
      <SelectedWork />
      <FinalCta />
    </>
  );
}
