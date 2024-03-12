<script lang="ts">
	import { onMount } from "svelte";
	import { currentTheme } from "../themes.js";

	export let letter: string;
	export let highlighted: boolean;
	export let settings: {rotationalOffset: number, translationalOffset: number}

	let x: number;
	let y: number;
	let r: number;
	onMount(() => {
		x = Math.floor(Math.random() * settings.translationalOffset) - (settings.translationalOffset / 2);
		y = Math.floor(Math.random() * settings.translationalOffset) - (settings.translationalOffset / 2);
		r = Math.floor(Math.random() * settings.rotationalOffset) - (settings.rotationalOffset / 2);
	});
</script>

<p style="--x: {x}px; --y: {y}px; --r: {r}deg; --h: {highlighted ? $currentTheme.red : 'inherit'};">{letter}</p>

<style>
	p {
		position: relative;
		font-size: inherit;
		display: inline-block;
		color: var(--h);
		animation: float 2.5s cubic-bezier(0.25, 1, 0.5, 1);
	}

	@keyframes float {
		from {
			left: var(--x);
			top: var(--y);
			transform: rotate(var(--r));
		}

		to {
			left: 0px;
			top: 0px;
			transform: rotate(0deg);
		}
	}
</style>
