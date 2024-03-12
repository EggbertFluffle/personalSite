<script lang="ts">
	import { currentTheme } from "./themes.js";

	import FloatingLetter from "./components/FloatingLetter.svelte";
	import Nav from "./components/Nav.svelte";

	let firstName: string = "Harrison";
	let lastName: string = "DiAmbrosio";
	let vowels: string = "aeiouAEIUO";
	let floatingLettersSettings = {
		translationalOffset: 1500,
		rotationalOffset: 720
	};
</script>


<main style="--bg: {$currentTheme.background};">
	<div class="hero">
		<h1 style="--fg: {$currentTheme.foreground};">
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
</main>

<style>
	main {
		background-color: var(--bg);
		font-family: monospace;
		height: 100vh;
	}

	.hero {
		display: flex;
		align-items: center;
	}

	h1 {
		padding: 0px;
		font-size: 12em;
		color: var(--fg);
		flex-grow: 1;
	}
</style>
