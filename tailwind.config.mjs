/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  // Dark mode is driven by the [data-theme="dark"] attribute set in the layout, not the
  // `dark:` class — but we expose it so utilities can target it if ever needed.
  darkMode: ['selector', '[data-theme="dark"]'],
  corePlugins: {
    // The existing hand-authored reset in global.css is the source of truth; disabling
    // Preflight prevents Tailwind's reset from fighting it and shifting the design.
    preflight: false,
  },
  theme: {
    extend: {
      // Brand tokens mapped to the CSS custom properties defined in global.css, so Tailwind
      // utilities (bg-surface, text-primary, ...) stay in sync with the light/dark themes.
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        'surface-offset': 'var(--color-surface-offset)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-highlight': 'var(--color-primary-highlight)',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['DM Sans', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: { xl: '1rem' },
    },
  },
  plugins: [],
};
