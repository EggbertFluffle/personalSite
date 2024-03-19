<script lang="ts">
	import FloatingLetter from "./FloatingLetter.svelte";
	import Nav from "./Nav.svelte";
	import { currentTheme } from "../themes.js";

	let firstName: string = "Harrison";
	let lastName: string = "DiAmbrosio";
	let vowels: string = "aeiouAEIUO";
	let floatingLettersSettings = {
		translationalOffset: 1500,
		rotationalOffset: 720
	};
</script>

<div class="hero">
	<h1 style="--foreground: {$currentTheme.foreground};">
		{#each firstName as l}
			<FloatingLetter letter={l} settings={floatingLettersSettings} highlighted={vowels.includes(l)}/>
		{/each}
		<br/>
		{#each lastName as l}
			<FloatingLetter letter={l} settings={floatingLettersSettings} highlighted={vowels.includes(l)}/>
		{/each}
	</h1>
	<Nav/>
</div>

<style>
	@font-face {
		font-family: 'MonaspaceKR';
		font-style: normal;
		src: url('/fonts/MonaspiceKrNerdFont-Regular.otf');
	}

	.hero {
		display: flex;
		align-items: center;
		height: 100vmin;
		font-family: MonaspaceKr, monospace;
	}

	h1 {
		padding: 0px;
		font-size: 14em;
		color: var(--foreground);
		flex-grow: 1;
	}
</style>
