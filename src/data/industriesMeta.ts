// Supporting visual metadata for the Industries card carousel (icon + one-line
// subtitle per sector). Kept separate from content.ts, whose copy is the
// transcribed source-of-truth and isn't meant to be extended here.
import {
  BriefcaseIcon,
  BuildingIcon,
  CartIcon,
  CoinsIcon,
  FactoryIcon,
  GraduationCapIcon,
  HandshakeIcon,
  HeartPulseIcon,
  TruckIcon,
} from "../components/icons/Icons";

export const industriesMeta: Record<string, { Icon: typeof HeartPulseIcon; subtitle: string }> = {
  Healthcare: { Icon: HeartPulseIcon, subtitle: "Better care. Through smarter tech." },
  "Finance & FinTech": { Icon: CoinsIcon, subtitle: "Secure. Scalable. Future-ready." },
  "Education & EdTech": { Icon: GraduationCapIcon, subtitle: "Enabling smarter learning journeys." },
  "Retail & E-commerce": { Icon: CartIcon, subtitle: "Seamless experiences that drive growth." },
  Manufacturing: { Icon: FactoryIcon, subtitle: "Efficiency for a stronger tomorrow." },
  "Logistics & Supply Chain": { Icon: TruckIcon, subtitle: "Smarter movement. Greater possibilities." },
  "Real Estate": { Icon: BuildingIcon, subtitle: "Digital platforms for modern property." },
  "Non-profit / NGO": { Icon: HandshakeIcon, subtitle: "Technology in service of real impact." },
  "Enterprise Solutions": { Icon: BriefcaseIcon, subtitle: "Enterprise-grade. Built to last." },
};
