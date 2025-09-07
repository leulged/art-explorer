const isVitest = !!process.env.VITEST;

// Use Tailwind PostCSS plugin in dev/build; skip in Vitest to avoid native lightningcss resolution issues.
export default {
  plugins: isVitest ? [] : ["@tailwindcss/postcss"],
};
