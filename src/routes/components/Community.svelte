<script lang="ts">
    import { currentTheme } from "../themes";

	const youtubeChannels: string[] = [
		"theprimeagen",
		"ThePrimeTimeagen",
		"TsodingDaily",
		"lowlevellearning",
		"DistroTube",
		"Fireship",
		"SebastianLague",
		"Kofybrek",
		"jdh",
		"TheCodingTrain"
	];
</script>

<div id="community" style="--foreground: {$currentTheme.foreground}; --orange: {$currentTheme.orange}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --purple: {$currentTheme.purple};">
	<h2>&lt;<span>Community</span>&gt;</h2>
	<h3 style="margin-top: 0px;">Media</h3>
	<p> 
		{#each youtubeChannels as channel}<a href={"https://www.youtube.com/@" + channel}>{channel}</a><span class="favorites-delimiter">-</span>{/each}<!--
		--><span><a href="https://lukesmith.xyz/">LukeSmith</a></span>
	</p>
	<h3>Favorites</h3>
	<ul>
		<li><a href="https://lunarflamestudios.com/">LunarFlame Studios</a> - Independant game dev team responsible for  the endlessly entertaining <a href="https://lunarflamestudios.com/pages/project-leo.php">Project Leo</a>. A fantastic game and team.</li>
		<li><a href="https://squi.bid">Squibid</a> - Personal projects, blogs from the one, the only, Squibid.</li>
		<li><a href="https://onocu.com">_Orange</a> - Three oranges in a trench coat, and great tea connoisseur.</li>
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

	h2 {
		margin-top: 2rem;
		font-size: 5rem;
	}


	h3 {
		font-size: 2rem;
		margin-block: 1rem;
		margin-inline: 1rem;
	}

	ul {
		margin-inline: 5rem;
		font-size: 1.25rem;
		list-style: none;
	}

	p > span {
		display: inline-block;
	}

	p {
		color: var(--foreground);
		margin-inline: 5rem;
		display: inline-block;
		font-size: 1.25rem;
	}

	.favorites-delimiter {
		margin-inline: 0.5rem;
	}

	li {
		margin-block: 0.5rem;
	}

	span {
		color: var(--purple);
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
			font-size: 3rem;
			text-align: center;
		}

		h3 {
			font-size: 2rem;
			text-align: center;
		}

		ul {
			font-size: 1rem;
			margin-inline: 2rem;
		}

		p {
			margin-inline: 1rem;
			display: inline-block;
			text-align: center;
			font-size: 1rem;
		}

		li {
			text-indent: 2rem;
		}

		.favorites-delimiter {
			margin-inline: 0.15rem;
		}
	}
</style>
