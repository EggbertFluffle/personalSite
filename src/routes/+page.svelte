<script lang="ts">
	import { currentTheme } from "./themes.js";

	import Hero from "./components/Hero.svelte";
	import WhoAmI from "./components/WhoAmI.svelte";
	import Blogs from "./components/Blogs.svelte";
	import Contact from "./components/Contact.svelte";
	import ThemePicker from "./components/ThemePicker.svelte";
</script>


<main style="--background1: {$currentTheme.background1};">
	<ThemePicker />
	<Hero />
	<WhoAmI/>
	<Blogs />
	<Contact />
</main>

<style>
	main {
		background-color: var(--background1);
		font-family: monospace;
	}

	main::after {
		color: var(--background1);
	}
</style>
