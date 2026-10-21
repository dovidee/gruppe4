"use client";

import styles from "./ProjectFilters.module.css";

export type Category = { value: string; label: string };

type ProjectFiltersProps = {
  categories: Category[];
  active: string | null;
  onChange: (value: string | null) => void;
  allLabel: string;
  label: string;
};

export function ProjectFilters({
  categories,
  active,
  onChange,
  allLabel,
  label,
}: ProjectFiltersProps) {
  const options = [{ value: null, label: allLabel }, ...categories];

  return (
    <div className={styles.filters} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value ?? "alle"}
          type="button"
          className={styles.chip}
          aria-pressed={active === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
