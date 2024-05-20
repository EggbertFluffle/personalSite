<script>
	import { currentTheme } from "../themes.js";
</script>

<div id="blog" style="--foreground: {$currentTheme.foreground}; --orange: {$currentTheme.orange}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow};">
	<h2>&lt;<span>Blog</span>&gt;</h2>
	<ul>
		<li>10/14/2023: <a href="/blogs/terminal_based_3d_graphics">Terminal Based 3D Graphics</a></li>
		<li>01/14/2024: <a href="/blogs/introduction">Introduction</a></li>
		<li>TT/BB/DDDD: <a href="/blogs/wolfenstein_terminal_raycaster">Wolfenstein-style Terminal Raycast Renderer</a></li>
		<li>03/22/2024: <a href="/blogs/neocities">Neocities</a></li>
		<li>05/09/2024: <a href="/blogs/minecraft_clone">Minecraft Clone (maybe pt.1)</a></li>
	</ul>
</div>


<style>
	* {
		font-family: Iosevka, monospace;
	}

	div {
		color: var(--foreground);
		margin-inline: 15%;
	}

	ul {
		margin-inline: 5rem;
		font-size: 1.75rem;
		list-style: none;
	}

	li {
		margin-block: 0.5rem;
	}

	h2 {
		margin-top: 2rem;
		font-size: 6rem;
	}

	span {
		color: var(--orange);
	}

	a {
		color: var(--yellow);
	}

	a:visited {
		color: var(--orange);
	}

	@media (max-width: 666px) {
		div {
			margin-inline: 0px;
		}

		h2 {
			margin-top: 2rem;
			font-size: 4rem;
			text-align: center;
		}

		ul {
			font-size: 1.25rem;
			margin-inline: 2rem;
		}
	}
</style>
