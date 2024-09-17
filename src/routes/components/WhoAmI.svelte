<script lang="ts">
	import { currentTheme } from "../themes.js";
</script>

<div id="whoAmI" style="--foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --green: {$currentTheme.green}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --orange: {$currentTheme.orange};">
	<h2>&lt;<span>WhoAmI</span>&gt;</h2>
	<p>I am <em>H<span>a</span>rr<span>i</span>s<span>o</span>n D<span>iA</span>mbr<span>o</span>s<span>io</span></em>, a humble programmer interested in all things related to creative coding, computer graphics, web development, game development, Linux, open source, and much more. I am all self taught, and have found learning about computers to be one of my life's passions. Familiarizing myself with a few programming languages, I enjoy writing C/C++, TypeScript, and some Java, as well as doing the Advent of Code every year. As of now I am studying Computer Science at Worcester Polytechnic Institute.</p>
	<h3>Technologies, Dotfiles, and Software I like</h3>
	<ul>
		<li><a target="_blank" href="https://github.com/EggbertFluffle/nvim"><strong>Neovim</strong></a> - Text editor and the only way I can type now. If I need to use another editor vim binds are a requirement, without question. Package management is done with <a href="https://github.com/folke/lazy.nvim">lazy.nvim</a> which makes the whole configuration process super portable.</li>
		<li><a target="_blank" href="https://voidlinux.org/"><strong>Linux (Void, Debian)</strong></a> - My choice for linux distros. Mostly used out of recommendation (or no other option). As for Void, I do appreciate the minimalism and boot speed. Debian is nice and simple as well, and if not for the outdated repos, it would be my favorite.</li>
		<li><a target="_blank" href="https://dwm.suckless.org/"><strong>dwm</strong></a> - Window manager of choice. Tough, efficient, and I love how the config is written in C. As for complementary programs, the only one that adds any functionality besides comsetics is <a href="https://tools.suckless.org/slstatus/">slstatus</a>.</li>
		<li><a target="_blank" href="https://github.com/saysjonathan/dwm.tmux"><strong>dwm.tmux</strong></a> - I use tmux for when I'm on my school chromebook or not in a graphical environment with tiling window management. This nice plugin makes it easy to get keybinds similar to dwm and it's a nice set-and-forget.</li>
		<li><a target="_blank" href="https://github.com/tsoding/boomer"><strong>boomer</strong></a> - A zooming utility for Linux built in Nim. Super satisfying to use and love the easing when zooming. Also, pround to support <a href="https://www.youtube.com/@TsodingDaily">Tsoding's videos</a>. Good ol' entertainment.</li>
		<!-- <li><a target="_blank" href="LINK"><strong>NAME</strong></a> - </li> -->
		<!-- Template list item -->
		<!-- <li><a target="_blank" href="LINK"><strong>NAME</strong></a> - </li> -->
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
		font-size: 6rem;
	}

	h2 > span {
		color: var(--green);
	}

	h3 {
		font-size: 2.5rem;
		margin-block: 1rem;
	}

	p {
		text-indent: 5rem;
		font-size: 1.75rem;
		margin-inline: 5rem;
	}

	em > span {
		color: var(--red);
	}

	ul {
		font-size: 1.75rem;
		margin-inline: 5rem;
	}

	a {
		color: var(--yellow);
	}
	
	a:visited {
		color: var(--orange);
	}

	li {
		margin-block: 1rem;
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

		p {
			text-indent: 2rem;
			font-size: 1.25rem;
			margin: 2rem;
		}

		h3 {
			font-size: 2rem;
			text-align: center;
		}

		ul {
			font-size: 1.25rem;
			margin: 2rem;
			list-style: none;
			text-indent: 1rem;
		}
	}
</style>
