import { baseURL, paths } from "@/resources";
import { getPosts, getProjects } from "@/sanity/content";

export default async function sitemap() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const routes = Object.values(paths).map((path) => ({
    url: `${baseURL}${path}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseURL}/blogg/${post.slug}`,
    lastModified: post.publishedAt || undefined,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseURL}/prosjekter/${project.slug}`,
  }));

  return [...routes, ...blogRoutes, ...projectRoutes];
}
