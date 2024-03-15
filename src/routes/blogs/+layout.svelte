<script lang="ts">
	import { currentTheme } from "../themes.js";
	import { onMount } from "svelte";
</script>

<main style="--background1: {$currentTheme.background1}; --background2: {$currentTheme.background2}; --foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --blue: {$currentTheme.blue}; --yellow: {$currentTheme.yellow}; --purple: {$currentTheme.purple}; --orange: {$currentTheme.orange}; --green: {$currentTheme.green}; --aqua: {$currentTheme.aqua}; --grey: {$currentTheme.grey};">
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
		font-size: 2em;
	}

	main :global(h2)::before {
		content: "## ";
		color: var(--grey);
	}

	main :global(p) {
		text-indent: 2em;
		margin-block: 0.75rem;
		line-height: 1.75rem;
	}

	main :global(a) {
		color: var(--yellow);
	}

	main :global(a):visited {
		color: var(--orange);
	}

	main :global(code) {
		font-family: monospace;
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

	:global(.hljs),
	:global(.hljs-subs)
	{
		color: var(--foreground);
	}

	/* Gruvbox Red */
	:global(.hljs-deletion),
	:global(.hljs-formula),
	:global(.hljs-keyword),
	:global(.hljs-link),
	:global(.hljs-selector-tag) 
	{
		color: var(--red);
	}

	/* Gruvbox Blue */
	:global(.hljs-built_in),
	:global(.hljs-emphasis),
	:global(.hljs-name),
	:global(.hljs-quote),
	:global(.hljs-strong),
	:global(.hljs-title),
	:global(.hljs-variable) 
	{
		color: var(--blue);
	}

	/* Gruvbox Yellow */
	:global(.hljs-attr),
	:global(.hljs-params),
	:global(.hljs-template-tag),
	:global(.hljs-type) 
	{
		color: var(--yellow);
	}

	/* Gruvbox Purple */
	:global(.hljs-builtin-name),
	:global(.hljs-doctag),
	:global(.hljs-literal),
	:global(.hljs-number) 
	{
		color: var(--purple);
	}

	/* Gruvbox Orange */
	:global(.hljs-code),
	:global(.hljs-meta),
	:global(.hljs-regexp),
	:global(.hljs-template-variable) 
	{
		color: var(--orange);
	}

	/* Gruvbox Green */
	:global(.hljs-addition),
	:global(.hljs-meta-string),
	:global(.hljs-section),
	:global(.hljs-selector-attr),
	:global(.hljs-selector-class),
	:global(.hljs-string),
	:global(.hljs-symbol) 
	{
		color: var(--green);
	}

	/* Gruvbox Aqua */
	:global(.hljs-attribute),
	:global(.hljs-bullet),
	:global(.hljs-class),
	:global(.hljs-function),
	:global(.hljs-function .hljs-keyword),
	:global(.hljs-meta-keyword),
	:global(.hljs-selector-pseudo),
	:global(.hljs-tag) 
	{
		color: var(--aqua);
	}

	/* Gruvbox Gray */
	:global(.hljs-comment) 
	{
		color: var(--grey);
	}

	:global(.hljs-comment),
	:global(.hljs-emphasis) 
	{
		font-style: italic;
	}

	:global(.hljs-section),
	:global(.hljs-strong),
	:global(.hljs-tag) 
	{
		font-weight: bold;
	}
</style>
