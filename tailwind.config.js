/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          bg: '#F7F4EE',        // Linen Cream
          card: '#FFFFFF',      // Paper White
          tile: '#F0EAE1',      // Soft Cream
          'tile-shadow': '#D6C2AD', // Clay Shadow
          text: '#2D3748',      // Warm Slate
          muted: '#718096',     // Soft Mocha
          mint: '#80C4B7',      // Sweet Mint (Matches / Primary buttons)
          'mint-dark': '#62A89B',
          honey: '#F6C87A',     // Honey Sun (Active selection / Stars)
          'honey-dark': '#E0B060',
        }
      },
      borderRadius: {
        'tile': '16px',
        'card': '24px',
      },
      boxShadow: {
        'tactile': '0px 4px 0px #D6C2AD',
        'tactile-pressed': '0px 0px 0px transparent',
        'cozy-card': '0px 10px 25px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
