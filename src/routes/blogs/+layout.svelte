<script lang="ts">
	import { currentTheme } from "../themes.js";
	import { onMount } from "svelte";
	import hljs from "highlight.js/lib/core";
	import typescript from "highlight.js/lib/languages/typescript";
    import ThemePicker from "../components/ThemePicker.svelte";

	hljs.registerLanguage("typescript", typescript);
	onMount(() => {
		const codeElements = document.getElementsByTagName("code");
		for(let i = 0; i < codeElements.length; i++) {
			codeElements[i].innerHTML = hljs.highlight(codeElements[i].innerText, { language: "typescript" }).value;
		};
	});
</script>

<ThemePicker /> 
<main style="--background1: {$currentTheme.background1}; --background2: {$currentTheme.background2}; --foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --blue: {$currentTheme.blue}; --yellow: {$currentTheme.yellow}; --purple: {$currentTheme.purple}; --orange: {$currentTheme.orange}; --green: {$currentTheme.green}; --aqua: {$currentTheme.aqua}; --grey: {$currentTheme.grey};">
	<a href="/#blog" style="font-family: monospace; color: var(--foreground); font-weight: bold;">&lt; Back</a>
	<slot></slot>
</main>

<style>
	main {
		padding-inline: 25%;
		padding-block: 5%;
		background-color: var(--background1);
		min-height: 100vmin;
		font-size: 24px;
	}

	main :global(*) {
		color: var(--foreground);
		font-family: sans-serif;
	}

	main :global(h1) {
		color: var(--red);
		font-size: 3em;
		margin-top: 0px;
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

	main :global(p) {
		margin-block: 0.75rem;
		line-height: 1.8rem;
	}

	main :global(a) {
		color: var(--yellow);
	}

	main :global(a):visited {
		color: var(--orange);
	}

	main :global(code) {
		font-family: monospace;
		background-color: var(--background2);
		font-size: 1.2rem;
	}

	main :global(span) {
		font-family: monospace;
	}

	main :global(pre) {
		background: var(--background2);
		white-space: pre-wrap;
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
		main {
			padding-inline: 1rem;
		}

		main :global(p) {
			font-size: 1.25rem;
		 	line-height: 1.35rem;
		}

		main :global(ol) {
			font-size: 1.25rem;
		 	line-height: 1.35rem;
			margin-inline: 2rem;
		}

		main :global(ul) {
			font-size: 1.25rem;
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

	main :global(.hljs),
	main :global(.hljs-subs)
	{
		color: var(--foreground);
	}

	/* Gruvbox Red */
	main :global(.hljs-deletion),
	main :global(.hljs-formula),
	main :global(.hljs-keyword),
	main :global(.hljs-link),
	main :global(.hljs-selector-tag) 
	{
		color: var(--red);
	}

	/* Gruvbox Blue */
	main :global(.hljs-built_in),
	main :global(.hljs-emphasis),
	main :global(.hljs-name),
	main :global(.hljs-quote),
	main :global(.hljs-strong),
	main :global(.hljs-title),
	main :global(.hljs-variable) 
	{
		color: var(--blue);
	}

	/* Gruvbox Yellow */
	main :global(.hljs-attr),
	main :global(.hljs-params),
	main :global(.hljs-template-tag),
	main :global(.hljs-type) 
	{
		color: var(--yellow);
	}

	/* Gruvbox Purple */
	main :global(.hljs-builtin-name),
	main :global(.hljs-doctag),
	main :global(.hljs-literal),
	main :global(.hljs-number) 
	{
		color: var(--purple);
	}

	/* Gruvbox Orange */
	main :global(.hljs-code),
	main :global(.hljs-meta),
	main :global(.hljs-regexp),
	main :global(.hljs-template-variable) 
	{
		color: var(--orange);
	}

	/* Gruvbox Green */
	main :global(.hljs-addition),
	main :global(.hljs-meta-string),
	main :global(.hljs-section),
	main :global(.hljs-selector-attr),
	main :global(.hljs-selector-class),
	main :global(.hljs-string),
	main :global(.hljs-symbol) 
	{
		color: var(--green);
	}

	/* Gruvbox Aqua */
	main :global(.hljs-attribute),
	main :global(.hljs-bullet),
	main :global(.hljs-class),
	main :global(.hljs-function),
	main :global(.hljs-function .hljs-keyword),
	main :global(.hljs-meta-keyword),
	main :global(.hljs-selector-pseudo),
	main :global(.hljs-tag) 
	{
		color: var(--aqua);
	}

	/* Gruvbox Gray */
	main :global(.hljs-comment) 
	{
		color: var(--grey);
	}

	main :global(.hljs-comment),
	main :global(.hljs-emphasis) 
	{
		font-style: italic;
	}

	main :global(.hljs-section),
	main :global(.hljs-strong),
	main :global(.hljs-tag) 
	{
		font-weight: bold;
	}
</style>
