"use client";

import styles from "./ProjectFilters.module.css";

export type Category = { value: string; label: string };

type ProjectFiltersProps = {
  categories: Category[];
  active: string | null;
  onChange: (value: string | null) => void;
};

export function ProjectFilters({ categories, active, onChange }: ProjectFiltersProps) {
  return (
    <div className={styles.filters} role="group" aria-label="Filtrer prosjekter">
      <button
        type="button"
        className={active === null ? styles.active : styles.chip}
        aria-pressed={active === null}
        onClick={() => onChange(null)}
      >
        Alle
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={active === category.value ? styles.active : styles.chip}
          aria-pressed={active === category.value}
          onClick={() => onChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
