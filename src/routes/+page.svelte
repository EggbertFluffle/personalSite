<script lang="ts">
	import { currentTheme } from "./themes.js";

	import FloatingLetter from "./components/FloatingLetter.svelte";
	import Nav from "./components/Nav.svelte";
	import WhoAmI from "./components/WhoAmI.svelte";
	import Blogs from "./components/Blogs.svelte";
	import ThemePicker from "./components/ThemePicker.svelte";

	let firstName: string = "Harrison";
	let lastName: string = "DiAmbrosio";
	let vowels: string = "aeiouAEIUO";
	let floatingLettersSettings = {
		translationalOffset: 1500,
		rotationalOffset: 720
	};
</script>


<main style="--background1: {$currentTheme.background1};">
	<ThemePicker />
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
	<WhoAmI/>
	<Blogs />
</main>

<style>
	@font-face {
		font-family: 'MonaspaceKR';
		font-style: normal;
		src: url('/fonts/MonaspiceKrNerdFont-Regular.otf');
	}

	main {
		background-color: var(--background1);
		font-family: monospace;
	}

	.hero {
		display: flex;
		align-items: center;
		height: 100vmin;
		font-family: MonaspaceKr;
	}

	h1 {
		padding: 0px;
		font-size: 14em;
		color: var(--foreground);
		flex-grow: 1;
	}
</style>
