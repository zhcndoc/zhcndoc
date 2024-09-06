export type ProjectItem = {
  id: string;
  type: number;
  origin: {
    repo: string;
    branch: string;
  };
  upstream: {
    repo: string;
    branch: string;
  };
};

export const project: ProjectItem[] = [
  {
    id: "elysia",
    type: 0,
    origin: {
      repo: "zhcndoc/elysia",
      branch: "main",
    },
    upstream: {
      repo: "elysiajs/documentation",
      branch: "main",
    },
  },
  {
    id: "drizzle",
    type: 0,
    origin: {
      repo: "zhcndoc/drizzle",
      branch: "main",
    },
    upstream: {
      repo: "drizzle-team/drizzle-orm-docs",
      branch: "main",
    },
  },
  {
    id: "vueuse",
    type: 0,
    origin: {
      repo: "zhcndoc/vueuse",
      branch: "main",
    },
    upstream: {
      repo: "vueuse/vueuse",
      branch: "main",
    },
  },
  {
    id: "unocss",
    type: 0,
    origin: {
      repo: "zhcndoc/unocss",
      branch: "main",
    },
    upstream: {
      repo: "unocss/unocss",
      branch: "main",
    },
  },
  {
    id: "shiki",
    type: 0,
    origin: {
      repo: "zhcndoc/shiki",
      branch: "main",
    },
    upstream: {
      repo: "shikijs/shiki",
      branch: "main",
    },
  },
  {
    id: "vitest",
    type: 1,
    origin: {
      repo: "zhcndoc/vitest",
      branch: "main",
    },
    upstream: {
      repo: "vitest-dev/docs-cn",
      branch: "dev",
    },
  },
  {
    id: "umami",
    type: 0,
    origin: {
      repo: "zhcndoc/umami",
      branch: "main",
    },
    upstream: {
      repo: "umami-software/website",
      branch: "master",
    },
  },
  {
    id: "astro",
    type: 1,
    origin: {
      repo: "zhcndoc/astro",
      branch: "main",
    },
    upstream: {
      repo: "withastro/docs",
      branch: "main",
    },
  },
  {
    id: "nuxt-color-mode",
    type: 0,
    origin: {
      repo: "zhcndoc/nuxt-color-mode",
      branch: "main",
    },
    upstream: {
      repo: "nuxt-modules/color-mode",
      branch: "main",
    },
  },
  {
    id: "vue",
    type: 1,
    origin: {
      repo: "zhcndoc/vue",
      branch: "main",
    },
    upstream: {
      repo: "vuejs/docs-cn",
      branch: "main",
    },
  },
  {
    id: "unjs",
    type: 0,
    origin: {
      repo: "zhcndoc/unjs",
      branch: "main",
    },
    upstream: {
      repo: "unjs/unjs",
      branch: "main",
    },
  },
  {
    id: "nitro",
    type: 0,
    origin: {
      repo: "zhcndoc/nitro",
      branch: "main",
    },
    upstream: {
      repo: "unjs/nitro",
      branch: "main",
    },
  },
  {
    id: "h3",
    type: 0,
    origin: {
      repo: "zhcndoc/h3",
      branch: "main",
    },
    upstream: {
      repo: "unjs/h3",
      branch: "main",
    },
  },
  {
    id: "nuxt",
    type: 0,
    origin: {
      repo: "zhcndoc/nuxt",
      branch: "main",
    },
    upstream: {
      repo: "nuxt/nuxt.com",
      branch: "main",
    },
  },
  {
    id: "nuxt-docs",
    type: 0,
    origin: {
      repo: "zhcndoc/nuxt-docs",
      branch: "main",
    },
    upstream: {
      repo: "nuxt/nuxt",
      branch: "main",
    },
  },
  {
    id: "nuxt-examples",
    type: 0,
    origin: {
      repo: "zhcndoc/nuxt-examples",
      branch: "main",
    },
    upstream: {
      repo: "nuxt/examples",
      branch: "main",
    },
  },
  {
    id: "vite",
    type: 1,
    origin: {
      repo: "zhcndoc/vite",
      branch: "main",
    },
    upstream: {
      repo: "vitejs/docs-cn",
      branch: "main",
    },
  },
  {
    id: "vitepress",
    type: 1,
    origin: {
      repo: "zhcndoc/vitepress",
      branch: "main",
    },
    upstream: {
      repo: "vuejs/vitepress",
      branch: "main",
    },
  },
];
