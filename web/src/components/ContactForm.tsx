import styles from "./ContactForm.module.css";

// Posts to our own route, not straight to Web3Forms: the route fans the message
// out to Web3Forms and Discord, and sends the visitor to a page of ours.
export function ContactForm() {
  return (
    <form className={styles.form} action="/api/contact" method="POST">
      <div className={styles.field}>
        <label className={styles.label} htmlFor="kontakt-navn">
          Navn
        </label>
        <input
          className={styles.input}
          id="kontakt-navn"
          type="text"
          name="name"
          autoComplete="name"
          maxLength={100}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="kontakt-epost">
          E-post
        </label>
        <input
          className={styles.input}
          id="kontakt-epost"
          type="email"
          name="email"
          autoComplete="email"
          maxLength={200}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="kontakt-melding">
          Melding
        </label>
        <textarea
          className={styles.textarea}
          id="kontakt-melding"
          name="message"
          rows={6}
          maxLength={1000}
          required
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        className={styles.hidden}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <button className={styles.submit} type="submit">
        Send melding
      </button>
    </form>
  );
}
