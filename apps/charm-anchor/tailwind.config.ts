import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "loader-jump": "loaderJump 0.5s linear infinite",
        "loader-shadow": "loaderShadow 0.5s linear infinite",
      },
      keyframes: {
        loaderJump: {
          "15%": {
            borderBottomRightRadius: "3px",
          },
          "25%": {
            transform: "translateY(9px) rotate(22.5deg)",
          },
          "50%": {
            transform: "translateY(18px) scale(1, 0.9) rotate(45deg)",
            borderBottomRightRadius: "40px",
          },
          "75%": {
            transform: "translateY(9px) rotate(67.5deg)",
          },
          "100%": {
            transform: "translateY(0) rotate(90deg)",
          },
        },
        loaderShadow: {
          "0%, 100%": {
            transform: "scale(1, 1)",
          },
          "50%": {
            transform: "scale(1.2, 1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
