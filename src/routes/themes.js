import { derived, writable } from "svelte/store";

const themes = {
	"gruvbox": {
		background1: "#3c3836",
		background2: "#282828",
		foreground: "#ebdbb2",
		red: "#fb4934",
		green: "#b8bb26",
		yellow: "#fabd2f",
		blue: "#83a598",
		purple: "#d3869b",
		cyan: "#8ec07c",
		orange: "#fe8019",
		grey: "#928374"
	},
	"dracula": {
		background1: "#44475a",
		background2: "#282a36",
		foreground: "#f8f8f2",
		red: "#ff5555",
		green: "#50fa7b",
		yellow: "#f1fa8c",
		blue: "#6272a4",
		purple: "#ffb86c",
		cyan: "#8be9fd",
		orange: "#ffb86c",
		grey: "#6272a4"
	},
	"tokyo_night": {
		background1: "#1a1b26",
		background2: "#1f2335",
		foreground: "#a9b1d6",
		red: "#f7768e",
		green: "#9ece6a",
		yellow: "#e0af68",
		blue: "#7aa2f7",
		purple: "#bb9af7",
		cyan: "#73daca",
		orange: "#ff9e64",
		grey: "#a9b1d6"
	},
	"ashen": {
		background1: "#121212",
		background2: "#e5e5e5",
		foreground: "#e5e5e5",
		red: "#df6464",
		green: "#1e6f54",
		yellow: "#e5a72a",
		blue: "#4a8b8b",
		purple: "#6f2929",
		cyan: "#b14242",
		orange: "#c4693d",
		grey: "#151515"
	},
	"gruber_darker": {
		background1: "#181818",
		background2: "#282828",
		foreground: "#f3f3fe",
		red: "#ffdd33",
		green: "#73d936",
		yellow: "#ffdd33",
		blue: "#96a5c7",
		purple: "#96a5c7",
		cyan: "#92a69c",
		orange: "#ffdd33",
		grey: "#96a5c7"
	}
};

const availableThemes = Object.keys(themes);

// Start with gruvbox
const themeName = writable("gruvbox");

// Random starting theme (if the others looked good)
// const themeName = writable(availableThemes[Math.random() * availableThemes.length << 0]);
const currentTheme = derived(themeName, ($themeName) => themes[$themeName])

export { themeName, currentTheme };
