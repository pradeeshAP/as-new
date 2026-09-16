import { ContactFaq } from "../components/ContactFaq";
import { ContactForm } from "../components/ContactForm";
import { ContactHero } from "../components/ContactHero";
import { ContactInfo } from "../components/ContactInfo";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <>
      <ContactHero />
      <section className={`${styles.body} grain`}>
        <div className={`container ${styles.grid}`}>
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <ContactFaq />
    </>
  );
}
