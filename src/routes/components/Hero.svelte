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
	.hero {
		display: flex;
		align-items: center;
		min-width: 100mvw;
		min-height: 100vh;
		font-family: MonaspaceKr, Iosevka, monospace;
	}

	h1 {
		padding: 0px;
		font-size: 11.45vw;
		color: var(--foreground);
		flex-grow: 1;
	}

	@media (max-width: 1000px) and (min-width: 666px) {
		h1 {
			font-size: 10.25vw;
		}
	}

	@media (max-width: 666px) {
		.hero {
			flex-direction: column;
			justify-content: space-between;
		}

		h1 {
			writing-mode: vertical-rl;
			font-size: 12vh;
			line-height: 100%;
			text-align: left;
			flex-grow: 0;
		}
	}
</style>
