<script lang="ts">
	import { themeName, currentTheme } from "../themes.js";

	let pickedTheme: string = "gruvbox";
</script>

<select bind:value={pickedTheme} on:change={() => themeName.update(() => pickedTheme)} style="--background1: {$currentTheme.background1}; --foreground: {$currentTheme.foreground}; --red: {$currentTheme.red};">
	<option id="gruvbox" value="gruvbox">Gruvbox</option>
	<option id="dracula" value="dracula">Dracula</option>
	<option id="tokyo_night" value="tokyo_night">Tokyo-Night</option>
</select>

<style>
	* {
		font-family: Iosevka, monospace;
	}

	select {
		position: absolute;
		right: 0px;
		background-color: var(--background1);
		color: var(--foreground);
		border: none;
		border-color: var(--red);
		border-radius: 0px;
		padding: 0.15rem;
	}

	select:after {
		border-radius: 0px;
	}
	
	#gruvbox {
		background-color: #282828;
		color: #ebdbb2;
	}

	#dracula {
		background-color: #44475a;
		color: #ff5555;
	}

	#tokyo_night {
		background-color: #1a1b26;
		color: #a9b1d6;
	}
</style>
