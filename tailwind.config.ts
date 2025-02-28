import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "eu-blue": "var(--blue)",
      },
    },
  },
  plugins: [],
} satisfies Config;
