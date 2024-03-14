import { derived, writable } from "svelte/store";

const themes = {
	"gruvbox": {
		background: "#3c3836",
		foreground: "#ebdbb2",
		red: "#fb4934",
		green: "#b8bb26",
		yellow: "#fabd2f",
		blue: "#83a598",
		purple: "#d3869b",
		cyan: "#8ec07c",
		orange: "#fe8019"
	},
	"dracula": {
		background: "#282a36",
		foreground: "#f8f8f2",
		red: "#ff5555",
		green: "#50fa7b",
		yellow: "#f1fa8c",
		blue: "#6272a4",
		purple: "#ffb86c",
		cyan: "#8be9fd",
		orange: "#ffb86c"
	},
	"tokyo_night": {
		background: "#1a1b26",
		foreground: "#a9b1d6",
		red: "#f7768e",
		green: "#9ece6a",
		yellow: "#e0af68",
		blue: "#7aa2f7",
		purple: "#bb9af7",
		cyan: "#73daca",
		orange: "#ff9e64"
	}
};

const themeName = writable("gruvbox");
const currentTheme = derived(themeName, ($themeName) => themes[$themeName])

export { themeName, currentTheme };
