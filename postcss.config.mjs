/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 你的设计稿宽度
      unitPrecision: 3,
      viewportUnit: "vw",
      selectorBlackList: [/^w-\[750px\]$/, /^max-w-\[750px\]$/],
      minPixelValue: 1,
      mediaQuery: false,
    },
  },
}

export default config
