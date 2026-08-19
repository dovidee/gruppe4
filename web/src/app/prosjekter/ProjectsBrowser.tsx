"use client";

import { useMemo, useState } from "react";
import { ProjectCard, ProjectFilters } from "@/components";
import type { Category } from "@/components/ProjectFilters";
import type { Project } from "@/sanity/content";
import styles from "./page.module.css";

function categoryLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const categories = useMemo<Category[]>(() => {
    const values = new Set<string>();
    for (const project of projects) {
      for (const category of project.categories) values.add(category);
    }
    return Array.from(values).map((value) => ({ value, label: categoryLabel(value) }));
  }, [projects]);

  const [active, setActive] = useState<string | null>(null);

  const visible = active ? projects.filter((project) => project.categories.includes(active)) : projects;

  return (
    <>
      <ProjectFilters categories={categories} active={active} onChange={setActive} />
      <div className={styles.grid}>
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
