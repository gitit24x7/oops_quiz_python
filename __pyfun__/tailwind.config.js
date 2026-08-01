/**
 * tailwind.config.js
 * 
 * DESCRIPTION:
 * Minimal Tailwind CSS configuration file for the Python Quest MVP.
 * 
 * CONTENTS:
 * Defines custom Google brand colors (google-blue, google-red, google-yellow, google-green)
 * to be used across the application components for a clean, recognizable UI.
 * 
 * CONNECTIONS:
 * - Used by PostCSS and Tailwind to generate `src/index.css`.
 * - Colors are accessed in JSX files via classes like `bg-google-blue` or `text-google-red`.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'google-blue': '#4285F4',
        'google-red': '#ea4335',
        'google-yellow': '#fbbc05',
        'google-green': '#34a853',
        // Deep archive ink — a warm near-black neutral ramp (not pure gray)
        // the alchemist theme's dark surfaces sit on. Registered as real
        // Tailwind theme colors rather than arbitrary var() references —
        // the latter silently failed to compile (see LandingPage.jsx note).
        ink: {
          50: '#f3f1ee',
          100: '#e8e4de',
          200: '#d3ccc0',
          300: '#b3a890',
          400: '#8f8270',
          500: '#6b6154',
          600: '#4d453b',
          700: '#362f28',
          800: '#211d18',
          900: '#151210',
          950: '#0b0a08',
        },
      },
      fontFamily: {
        // Repoints the app's existing font-serif / font-mono utilities —
        // both already used throughout the component tree — onto a real
        // display serif and a real code face instead of generic fallbacks.
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
