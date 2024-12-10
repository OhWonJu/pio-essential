import "@pio-essential/tailwind-config/style.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    rootAttributesTooltip: true,
    rootAttributes: [
      {
        root: "body",
        attribute: "class",
        defaultState: {
          name: "light",
          value: "light",
        },
        states: [
          {
            name: "dark",
            value: "dark",
          },
        ],
      },
    ],
  },
};

const initTheme = () => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDarkTheme) {
    document.body.classList.add("dark");
  }

  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQueryList.addEventListener("change", (e) => {
    if (e.matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
};

initTheme();

export default preview;
