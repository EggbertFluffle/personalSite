<script lang="ts">
import ThemePicker from "../components/ThemePicker.svelte";

import { currentTheme } from "../themes.js";
import { onMount } from "svelte";
</script>

<ThemePicker /> 
<main style="--background1: {$currentTheme.background1}; --background2: {$currentTheme.background2}; --foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --blue: {$currentTheme.blue}; --yellow: {$currentTheme.yellow}; --purple: {$currentTheme.purple}; --orange: {$currentTheme.orange}; --green: {$currentTheme.green}; --aqua: {$currentTheme.aqua}; --grey: {$currentTheme.grey};">
	<a href="/#blog" style="font-family: monospace; color: var(--foreground); font-weight: bold;">&lt; Back</a>
	<slot></slot>
</main>

<style>
	main {
		padding-inline: 20%;
		padding-block: 5%;
		background-color: var(--background1);
		min-height: 100vmin;
		font-size: 1.15rem;
	}

	main :global(*) {
		color: var(--foreground);
		font-family: Iosevka, monospace;
		margin-block: 1rem;
	}

	main :global(h1) {
		color: var(--red);
		font-size: 3em;
	}

	main :global(h1)::before {
		content: "# ";
		color: var(--grey);
	}

	main :global(h2) {
		color: var(--green);
		font-size: 2.25em;
	}

	main :global(h2)::before {
		content: "## ";
		color: var(--grey);
	}

	main :global(h3) {
		font-size: 1.5em;
		margin-top: 1rem;
	}

	main :global(p) {
		margin-block: 0.75rem;
		line-height: 1.5rem;
	}

	main :global(a) {
		color: var(--yellow);
	}


	main :global(a):visited {
		color: var(--orange);
	}

	main :global(span) {
		font-family: monospace;
	}

	main :global(code) {
		background: var(--background2);
		text-wrap-mode: nowrap;
		overflow-x: scroll;
		max-width: 100lvw;
	}

	main :global(pre) {
		background: var(--background2);
		text-wrap-mode: nowrap;
		overflow-x: scroll;
		max-width: 100lvw;
		padding: 1rem;
	}

	main :global(ul) {
		margin-inline: 5rem;
	}

	main :global(ol) {
		margin-inline: 5rem;
	}

	main :global(li) {
		margin-block: 0.75rem;
	}

	@media (max-width: 666px) {
		main :global(h2)::before {
			display: none;
		}

		main :global(p) {
			font-size: 1rem;
			line-height: 1.35rem;
		}

		main :global(pre) {
			font-size: 1rem;
		}

		main :global(ol) {
			font-size: 1rem;
			line-height: 1.35rem;
			margin-inline: 2rem;
		}

		main :global(ul) {
			font-size: 1rem;
			line-height: 1.35rem;
			margin-inline: 2rem;
		}

		main :global(h1) {
			font-size: 2.5rem;
			text-align:	center;
		}

		main :global(h2) {
			font-size: 2rem;
			text-align: center;
		}
	}


	main :global(img) {
		width: 100%;
	}

	main :global(.kw),
	main :global(.cf),
	main :global(.im),
	main :global(.dt) {
		color: var(--red);
	}

	main :global(.va),
	main :global(.ot) {
		color: red;
	}

	main :global(.at),
	main :global(.pp) {
		color: var(--yellow);
	}

	main :global(.dv),
	main :global(.bn),
	main :global(.fl),
	main :global(.cn),
	main :global(.ch) {
		color: var(--purple);
	}

	main :global(.op),
	main :global(.sc),
	main :global(.ss) {
		color: var(--orange);
	}

	main :global(.st) {
		color: var(--green);
	}

	main :global(.fu),
	main :global(.bu) {
		color: var(--aqua);
	}

	main :global(.co) {
		color: var(--grey);
		font-style: italic;
	}
</style>
