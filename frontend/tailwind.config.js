/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'stretch': ['StretchPro', 'sans-serif'],
        'mirage': ['Mirage-Regular', 'sans-serif'],
        'creato-thin': ['CreatoDisplay-Thin', 'sans-serif'],
        'creato-thin-italic': ['CreatoDisplay-ThinItalic', 'sans-serif'],
        'creato-black': ['CreatoDisplay-Black', 'sans-serif'],
        'creato-black-italic': ['CreatoDisplay-BlackItalic', 'sans-serif'],
        'coolvetica': ['Coolvetica-Regular', 'sans-serif'],
        'coolvetica-italic': ['Coolvetica-Italic', 'sans-serif'],
        'semika': ['Semika', 'sans-serif'],
        'rotifera': ['Rotifera-BlackItalic', 'sans-serif'],
        'eloquia-text': ['EloquiaText-ExtraLight', 'sans-serif'],
        'eloquia-display': ['EloquiaDisplay-ExtraBold', 'sans-serif'],
        'dotmatrix': ['DotMatrix', 'monospace'],
        'airnt': ['Airnt', 'sans-serif'],
        'airnt-bold': ['Airnt-Bold', 'sans-serif'],
        'airnt-quantum': ['Airnt-Quantum', 'sans-serif'],
        'aquire': ['Aquire', 'sans-serif'],
        'aquire-bold': ['Aquire-Bold', 'sans-serif'],
        'aquire-light': ['Aquire-Light', 'sans-serif'],
        'round8': ['Round8-Four', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
  