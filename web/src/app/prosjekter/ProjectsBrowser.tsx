"use client";

import { useMemo, useState } from "react";
import { EmptyState, ProjectFilters, ProjectPanel, Stack, StackItem } from "@/components";
import type { Category } from "@/components/ProjectFilters";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import type { Project } from "@/sanity/content";
import styles from "./page.module.css";

function categoryLabel(value: string, locale: Locale) {
  return dictionaries[locale].categories[value] ?? value.charAt(0).toUpperCase() + value.slice(1);
}

export function ProjectsBrowser({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = dictionaries[locale];
  const categories = useMemo<Category[]>(() => {
    const values = new Set<string>();
    for (const project of projects) {
      for (const category of project.categories) values.add(category);
    }
    return Array.from(values).map((value) => ({ value, label: categoryLabel(value, locale) }));
  }, [projects, locale]);

  const [active, setActive] = useState<string | null>(null);

  const visible = active ? projects.filter((project) => project.categories.includes(active)) : projects;

  return (
    <>
      {categories.length > 1 && (
        <div className={styles.filters}>
          <ProjectFilters
            categories={categories}
            active={active}
            onChange={setActive}
            allLabel={t.allCategories}
            label={t.filterProjects}
          />
        </div>
      )}
      {visible.length === 0 ? (
        <div className="container">
          <EmptyState title={t.noProjects} />
        </div>
      ) : (
        <Stack>
          {visible.map((project, i) => (
            <StackItem key={project.id} index={i}>
              <ProjectPanel project={project} locale={locale} />
            </StackItem>
          ))}
        </Stack>
      )}
    </>
  );
}
