<script lang="ts">
	import { onMount } from "svelte";
	import { currentTheme } from "../themes.js";

	export let letter: string;
	export let highlighted: boolean;
	export let settings: {rotationalOffset: number, translationalOffset: number };

	export let mouse: { x: number, y: number };

	let element: HTMLParagraphElement;

	const fps: number = 60;
	const mouseRad: number = 300;
	const targetRad: number = 10;
	const friction: number = 0.05;
	const timeScale: number = 7;
	
	let posX: number = 0;
	let posY: number = 0;
	let rot: number = 0;

	let velX: number = 0;
	let velY: number = 0;
	let velR: number = 0;

	let updateId: number;
	let lastUpdate: number = 0;

	const update = () => {
		let currTime: number = Date.now() / timeScale;
		let deltaTime: number = currTime - lastUpdate ;
		lastUpdate = currTime;

		if(element == null) return;
		let clientRect: DOMRect = element.getBoundingClientRect();
		let clientX: number = clientRect.x + clientRect.width / 2;
		let clientY: number = clientRect.y + clientRect.height / 2;

		if(window.innerWidth > 666) {
			let mouseDist: number = Math.sqrt(Math.pow(mouse.x - clientX, 2) + Math.pow(mouse.y - clientY, 2));
			let repelX: number = 0;
			let repelY: number = 0;
			let repelR: number = 0;
			if(mouseDist < mouseRad) {
				repelX = -(mouse.x - clientX) / mouseDist;
				repelY = -(mouse.y - clientY) / mouseDist;
				repelR = repelX;
			}
			velX += repelX * deltaTime;
			velY += repelY * deltaTime;
			velR += repelR * deltaTime;
		}

		let targetDist: number = Math.sqrt(posX * posX + posY * posY);
		let seekX: number = 0;
		let seekY: number = 0;
		let seekR: number = 0;
		if(targetDist > targetRad) {
			seekX = -posX / (targetDist + targetRad);
			seekY = -posY / (targetDist + targetRad);
			seekR = -rot / (targetDist + targetRad);
		}
		velX += seekX * deltaTime;
		velY += seekY * deltaTime;
		velR += seekR * deltaTime;

		velX += -velX * friction * deltaTime;
		velY += -velY * friction * deltaTime;
		velR += -velR * friction * deltaTime;

		posX += velX;
		posY += velY;
		rot += velR;
	}

	onMount(() => {
		posX = Math.floor(Math.random() * settings.translationalOffset) - (settings.translationalOffset / 2);
		posY = Math.floor(Math.random() * settings.translationalOffset) - (settings.translationalOffset / 2);
		rot = Math.floor(Math.random() * settings.rotationalOffset) - (settings.rotationalOffset / 2);
		lastUpdate = Date.now() / timeScale;

		updateId = setInterval(update, fps/1000);
	});
	
</script>

<p bind:this={element} style="--x: {posX}px; --y: {posY}px; --r: {rot}deg; --h: {highlighted ? $currentTheme.red : 'inherit'};">{letter}</p>

<style>
	p {
		position: relative;
		font-size: inherit;
		display: inline-block;
		color: var(--h);
		left: var(--x);
		top: var(--y);
		transform: rotate(var(--r));
		/* animation: float 2.5s cubic-bezier(0.25, 1, 0.5, 1); */
	}

	/* @keyframes float { */
	/* 	from { */
	/* 		left: var(--x); */
	/* 		top: var(--y); */
	/* 		transform: rotate(var(--r)); */
	/* 	} */
	/**/
	/* 	to { */
	/* 		left: 0px; */
	/* 		top: 0px; */
	/* 		transform: rotate(0deg); */
	/* 	} */
	/* } */
</style>
