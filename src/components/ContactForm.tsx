import { AnimatePresence, motion } from "framer-motion";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { contactPage } from "../data/content";
import { useReveal } from "../hooks/useScrollReveal";
import styles from "./ContactForm.module.css";
import { CheckIcon, PaperPlaneIcon } from "./icons/Icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", phone: "", company: "", message: "" };

export function ContactForm() {
  const revealCard = useReveal(0.1);
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const updateField = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleInterest = (item: string) => {
    setInterests((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please share your name.";
    if (!values.email.trim()) next.email = "Please share an email address.";
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "That email address doesn't look right.";
    if (!values.message.trim()) next.message = "Tell us a little about the project.";
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // No backend is wired up yet — this simulates a network round-trip so the
    // interaction and success state can be demonstrated end to end.
    window.setTimeout(() => setStatus("success"), 1100);
  };

  const handleReset = () => {
    setValues(INITIAL_STATE);
    setInterests([]);
    setBudget("");
    setErrors({});
    setStatus("idle");
  };

  return (
    <motion.div {...revealCard} className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.card}>
        <span className={styles.tag}>No spam, ever</span>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              className={styles.success}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.successIconWrap}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M4 12.5 9 17 20 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </span>
              <h3 className={styles.successHeading}>{contactPage.form.success.heading}</h3>
              <p className={styles.successDescription}>{contactPage.form.success.description}</p>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className={styles.heading}>{contactPage.form.heading}</h2>
              <p className={styles.description}>{contactPage.form.description}</p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={`${styles.field} ${errors.name ? styles.invalid : ""}`}>
                    <input
                      id="cf-name"
                      type="text"
                      placeholder=" "
                      value={values.name}
                      onChange={updateField("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "cf-name-error" : undefined}
                    />
                    <label htmlFor="cf-name">{contactPage.form.fields.name}</label>
                    {errors.name && (
                      <span className={styles.errorText} id="cf-name-error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={`${styles.field} ${errors.email ? styles.invalid : ""}`}>
                    <input
                      id="cf-email"
                      type="email"
                      placeholder=" "
                      value={values.email}
                      onChange={updateField("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "cf-email-error" : undefined}
                    />
                    <label htmlFor="cf-email">{contactPage.form.fields.email}</label>
                    {errors.email && (
                      <span className={styles.errorText} id="cf-email-error">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <input
                      id="cf-phone"
                      type="tel"
                      placeholder=" "
                      value={values.phone}
                      onChange={updateField("phone")}
                    />
                    <label htmlFor="cf-phone">{contactPage.form.fields.phone}</label>
                  </div>

                  <div className={styles.field}>
                    <input
                      id="cf-company"
                      type="text"
                      placeholder=" "
                      value={values.company}
                      onChange={updateField("company")}
                    />
                    <label htmlFor="cf-company">{contactPage.form.fields.company}</label>
                  </div>
                </div>

                <div>
                  <span className={styles.groupLabel}>{contactPage.form.interestsLabel}</span>
                  <div className={styles.chips} role="group" aria-label={contactPage.form.interestsLabel}>
                    {contactPage.form.interests.map((item) => {
                      const active = interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                          aria-pressed={active}
                          onClick={() => toggleInterest(item)}
                        >
                          <span className={styles.chipCheck}>{active && <CheckIcon size={12} />}</span>
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className={styles.groupLabel}>{contactPage.form.budgetLabel}</span>
                  <div className={styles.chips} role="group" aria-label={contactPage.form.budgetLabel}>
                    {contactPage.form.budgets.map((item) => {
                      const active = budget === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                          aria-pressed={active}
                          onClick={() => setBudget(item)}
                        >
                          <span className={styles.chipCheck}>{active && <CheckIcon size={12} />}</span>
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={`${styles.field} ${errors.message ? styles.invalid : ""}`}>
                  <textarea
                    id="cf-message"
                    placeholder=" "
                    value={values.message}
                    onChange={updateField("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "cf-message-error" : undefined}
                  />
                  <label htmlFor="cf-message">{contactPage.form.messageLabel}</label>
                  {errors.message && (
                    <span className={styles.errorText} id="cf-message-error">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className={styles.footerRow}>
                  <p className={styles.privacyNote}>{contactPage.form.privacyNote}</p>
                  <button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        {contactPage.form.submitting}
                      </>
                    ) : (
                      <>
                        {contactPage.form.submit}
                        <span className={styles.submitIcon}>
                          <PaperPlaneIcon size={16} />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
