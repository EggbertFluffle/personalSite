<script lang="ts">
    import { currentTheme } from "../themes";

	// const youtubeChannels: string[] = [
	// 	"theprimeagen",
	// 	"ThePrimeTimeagen",
	// 	"TsodingDaily",
	// 	"lowlevellearning",
	// 	"DistroTube",
	// 	"Fireship",
	// 	"SebastianLague",
	// 	"Kofybrek",
	// 	"jdh",
	// 	"TheCodingTrain",
	// 	"MichaelMJD"
	// ];
</script>

<div id="community" style="--foreground: {$currentTheme.foreground}; --orange: {$currentTheme.orange}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --purple: {$currentTheme.purple};">
	<h2>&lt;<span>Community</span>&gt;</h2>
	<!-- <h3 style="margin-top: 0px;">Media</h3> -->
	<!-- <p>  -->
	<!-- 	{#each youtubeChannels as channel}<a href={"https://www.youtube.com/@" + channel}>{channel}</a><span class="favorites-delimiter">-</span>{/each}<!-- -->
	<!-- 	-->
	<!-- <span><a href="https://lukesmith.xyz/">LukeSmith</a></span> -->
	<!-- </p> -->
	<!-- <h3>Favorites</h3> -->
	<ul>
		<li><a target="_blank" href="https://lunarflame.dev/">LunarFlame Studios</a> - Independant game dev team responsible for  the endlessly entertaining <a target="_blank" href="https://lunarflame.dev/projects/project-leo">Project Leo</a>. A fantastic game and team.</li>
		<li><a target="_blank" href="https://squi.bid">Squibid</a> - Personal projects, blogs from the one, the only, Squibid.</li>
		<li><a target="_blank" href="https://www.onocu.com">_Orange</a> - Three oranges in a trench coat, and great tea connoisseur.</li>
		<li><a target="_blank" href="https://wideeyed.online/">lafayette°</a> - Electric classmate and <a target="_blank" href="https://www.instagram.com/lafayette.degrees/">graphic design hobbyist</a></li>
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

	ul {
		margin-inline: 5rem;
		font-size: 1.5rem;
		list-style: none;
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

		ul {
			font-size: 1rem;
			margin-inline: 2rem;
		}

		li {
			text-indent: 2rem;
		}
	}
</style>
