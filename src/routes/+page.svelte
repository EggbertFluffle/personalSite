<script lang="ts">
	import FloatingLetter from "./components/FloatingLetter.svelte";

	let firstName: string = "Harrison";
	let lastName: string = "DiAmbrosio";
	let vowels: string = "aeiouAEIUO";
</script>

<h1>
	{#each firstName as l}
		<FloatingLetter letter={l} translationOffset={1500} rotationOffset={720} highlighted={vowels.includes(l)}/>
	{/each}
	<br/>
	{#each lastName as l}
		<FloatingLetter letter={l} translationOffset={1500} rotationOffset={720} highlighted={vowels.includes(l)}/>
	{/each}
</h1>

<style>
	:root {
		background-color: #3c3836;
	}

	h1 {
		padding: 0px;
		font-size: 12em;
		color: #ebdbb2;
	}
</style>
