import { Framework } from "../@types/build";

export const FRAMEWORK_PRESET: Record<
  Framework,
  { buildCommand: string; installCommand: string }
> = {
  "Create React App": {
    buildCommand: "npm run build",
    installCommand: "npm start",
  },
  "React Static": {
    buildCommand: "react-static build",
    installCommand: "dist",
  },
  "Next.js (Static HTML Export)": {
    buildCommand: "next build && next export",
    installCommand: "next start",
  },
  "Nuxt.js": {
    buildCommand: "nuxt generate",
    installCommand: "dist",
  },
  "Angular (Angular CLI)": {
    buildCommand: "ng build",
    installCommand: "dist",
  },
  Astro: {
    buildCommand: "npm run build",
    installCommand: "dist",
  },
  Gatsby: {
    buildCommand: "gatsby build",
    installCommand: "public",
  },
  GitBook: {
    buildCommand: "gitbook build",
    installCommand: "_book",
  },
  Jekyll: {
    buildCommand: "jekyll build",
    installCommand: "_site",
  },
  Remix: {
    buildCommand: "npm run build",
    installCommand: "public",
  },
  Svelte: {
    buildCommand: "npm run build",
    installCommand: "public",
  },
  Vue: {
    buildCommand: "npm run build",
    installCommand: "public",
  },
  VuePress: {
    buildCommand: "vuepress build $directory",
    installCommand: "$directory/.vuepress/dist",
  },
};
