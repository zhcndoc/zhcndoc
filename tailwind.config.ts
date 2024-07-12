import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        "source-han-serif": ["SourceHanSerif", "serif"],
      },
    },
  },
};
