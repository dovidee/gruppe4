import styles from "./Chip.module.css";

type ChipProps = {
  label: string;
  variant?: "default" | "want";
};

export function Chip({ label, variant = "default" }: ChipProps) {
  return (
    <span className={variant === "want" ? styles.want : styles.chip}>{label}</span>
  );
}
