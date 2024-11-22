/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "570px",
      md: "570px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1535px",
    },
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        quiz_bg: "url('/images/bg_quiz_screen.png')",
      },
      fontFamily: {
        Barlow: ["Barlow", "sans-serif"],
        RiftSoft: ["Rift Soft", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Eczar: ["Eczar", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceLR: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
        positionToCenter: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(250px)" }, // Adjust according to your needs
        },
        centerToPosition: {
          "0%": { transform: "translateY(250px)" },
          "100%": { transform: "translateY(0px)" }, // Adjust according to your needs
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
        bounceLR: "bounceLR 1s infinite",
        centerToPosition: "centerToPosition 0.5s forwards",
        positionToCenter: "positionToCenter 0.5s forwards",
        scale: "scalePulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
