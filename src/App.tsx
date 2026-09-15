import { CursorDot } from "./components/CursorDot";
import { ScrollProgress } from "./components/ScrollProgress";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Industries } from "./components/Industries";
import { Solutions } from "./components/Solutions";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TechStack } from "./components/TechStack";
import { SelectedWork } from "./components/SelectedWork";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <CursorDot />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Industries />
        <Solutions />
        <WhyChooseUs />
        <TechStack />
        <SelectedWork />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;
