/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 12px 48px rgba(15, 23, 42, 0.12)',
        card: '0 10px 30px rgba(15, 23, 42, 0.08)'
      },
      backgroundImage: {
        'soft-radial': 'radial-gradient(circle at top, rgba(148,163,184,0.20), transparent 60%)'
      }
    }
  },
  plugins: []
};
