import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "serif"]
      }
    }
  },
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"]
};

export default tailwindConfig;
