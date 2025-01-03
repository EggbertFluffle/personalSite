<script lang="ts">
	import { currentTheme } from "../themes.js";

	export let name: string;
	export let description: string;
	export let link: string;
</script>

<a href={link}>
	<div class="entry">
		<h4>{name}</h4>
		<p>{description}</p>
	</div>
</a>

<style>
	a {
		text-decoration: none;
	}

	h4 {
		font-size: 1.75rem;
		text-align: left;
	}

	div {
		display: flex;	
		flex-direction: column;
		border: solid var(--foreground) 2px;
		border-radius: 0.5rem;
		padding: 0.5rem;
		color: var(--foreground);
	}

	p {
		text-decoration: none;
		font-size: 1.25rem;
		margin-left: 2.5rem;
	}
</style>
