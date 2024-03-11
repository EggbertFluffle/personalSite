<script lang="ts">
	export let letter: string;
	export let translationOffset: number;
	export let rotationOffset: number;
	export let highlighted: boolean;

	let x: number = Math.floor(Math.random() * translationOffset) - (translationOffset / 2);
	let y: number = Math.floor(Math.random() * translationOffset) - (translationOffset / 2);
	let r: number = Math.floor(Math.random() * rotationOffset) - (rotationOffset / 2);
</script>

<p style="--x: {x}px; --y: {y}px; --r: {r}deg; --h: {highlighted ? '#fb4938' : 'inherit'};">{letter}</p>

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
