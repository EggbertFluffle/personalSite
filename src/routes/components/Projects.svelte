<script lang="ts">
	import ProjectEntry from "./ProjectEntry.svelte";

	import { currentTheme } from "../themes.js";
</script>

<div id="projects" style="--foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --green: {$currentTheme.green}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --orange: {$currentTheme.orange};">
	<h2>&lt;<span>Projects</span>&gt;</h2>
	<div class="project-list">
		<ProjectEntry 
			name="BeepBoop.nvim" 
			description="A Neovim plugin intended to make it easy to incorporate audio cues into Neovim. This can be for accessibility reasons, or in my case, just for fun!"
			link="https://github.com/EggbertFluffle/beepboop.nvim" />
	</div>
</div>

<style>
	* {
		font-family: Iosevka, monospace;
	}

	#projects{
		color: var(--foreground);
		margin-inline: 15%;
	}

	.project-list {
		margin-top: 1rem;
		margin-inline: 5rem;
	}

	h2 {
		font-size: 5rem;
	}

	h2 > span {
		color: var(--red);
	}

	@media (max-width: 666px) {
		.project-list {
			margin-inline: 0rem;
		}

		h2 {
			margin-top: 2rem;
			font-size: 3rem;
			text-align: center;
		}
	}
</style>
