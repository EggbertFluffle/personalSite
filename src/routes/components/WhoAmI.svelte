<script lang="ts">
	import { currentTheme } from "../themes.js";
</script>

<div id="whoAmI" style="--foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --green: {$currentTheme.green}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow};">
	<h2>&lt;<span>WhoAmI</span>&gt;</h2>
	<p>I am <em>H<span>a</span>rr<span>i</span>s<span>o</span>n D<span>iA</span>mbr<span>o</span>s<span>io</span></em>. A humble programmer interested in all things relative to web development, creative coding, computer graphics, game development and linux. I am all self taught, and have found learning about comptuers to be one of my all time favorite hobbies. I am familliarizing myself with a couple languages, such as C, C++ and TypeScript, but I'm most comfaterble with JavaScript. Additionally, I'm most comfaterble with putting together projects in a web development setting, using SvelteKit and NodeJS/Bun. As of now I'm a graduating highschool senior and plan to study Computer Science in university. Below is what I use for my development workflow and my dotfiles.</p>
	<ul>
		<li><a href="https://github.com/EggbertFluffle/nvim">Neovim</a> - Text editor and the only way I can type now. I manage packages with lazy, and other than Harpoon and.</li>
		<li><a href="https://voidlinux.org/">Void Linux</a> - My choice for linux distro. Mostly used out of recommendation.</li>
		<li><a href="https://dwm.suckless.org/">dwm</a> - Window manager of choice. Simple, works well, and I love how the config is written in C.</li>
		<li><a href="https://github.com/EggbertFluffle/kitty">Kitty</a> - Just a terminal emulator, I like it for the in built image rendering. It also has nice paneling that can be simmilar to my dwm binds but I don't take advantage of those often.</li>
		<li><a href="https://github.com/saysjonathan/dwm.tmux">dwm.tmux</a> - I use tmux for when I'm on my school chromebook or not in a graphical enviroenment with tiling window management. This nice plugin makes it easy to get keybinds simmilar to dwm and it's a nice set and forget.</li>
	</ul>
</div>

<style>
	div {
		margin-inline: 15%;
		color: var(--foreground);
	}

	h2 {
		font-size: 8rem;
	}

	h2 > span {
		color: var(--green);
	}

	p {
		text-indent: 10%;
		font-size: 2rem;
	}

	em > span {
		color: var(--red);
	}

	ul {
		font-size: 1.5rem;
		margin-inline: 10%;
	}

	a {
		color: var(--yellow);
	}
	
	a:visited {
		color: var(--orange);
	}
</style>
