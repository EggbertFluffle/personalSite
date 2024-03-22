<script lang="ts">
	import { currentTheme } from "../themes.js";
</script>

<div id="whoAmI" style="--foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --green: {$currentTheme.green}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --orange: {$currentTheme.orange};">
	<h2>&lt;<span>WhoAmI</span>&gt;</h2>
	<p>I am <em>H<span>a</span>rr<span>i</span>s<span>o</span>n D<span>iA</span>mbr<span>o</span>s<span>io</span></em>. A humble programmer interested in all things related to web development, creative coding, computer graphics, game development and linux. I am all self taught, and have found learning about comptuers to be one of my life's passions. I am familliarizing myself with a few programming languages: C++, TypeScript, JavaScript, and some Java. Additionally, I'm most comfortable as a web developer and frequently dive deep into the community on new runtimes, framewroks and best practices. I find Svelte to come with a great exsperience and enjoy building projects most often in the framework. As of now I'm a graduating senior from Saint Peter's Prep and plan to study Computer Science (or Computer Engineering) in university. Finnaly, below I've listed some various technologies I take advantage of as a developer and must-haves in my workflow.</p>
	<h3>Technologies and Dotfiles</h3>
	<ul>
		<li><a target="_blank" href="https://github.com/EggbertFluffle/nvim">Neovim</a> - Text editor and the only way I can type now. If I need to use anotehr editor I need vim binds, without question. Package management done with <a href="https://github.com/folke/lazy.nvim">lazy.nvim</a> which makes the whole configuration process super portable.</li>
		<li><a target="_blank" href="https://voidlinux.org/">Linux (Void, Debian)</a> - My choice for linux distros. Mostly used out of recommendation (or no other option). As for Void, I do appreciate the minimalism and boot speed. Debian is nice and simple as well, and if not for the outdated repos, it would be my favorite.</li>
		<li><a target="_blank" href="https://dwm.suckless.org/">dwm</a> - Window manager of choice. Simple, works well, and I love how the config is written in C. As for complementary programs, the only one that adds any functionality besides comsetics is <a href="https://tools.suckless.org/slstatus/">slstatus</a>.</li>
		<li><a target="_blank" href="https://github.com/EggbertFluffle/kitty">Kitty</a> - Just a terminal emulator, I like it for the in built image rendering. It also has nice paneling that can be simmilar to my dwm binds but I don't take advantage of those often.</li>
		<li><a target="_blank" href="https://github.com/saysjonathan/dwm.tmux">dwm.tmux</a> - I use tmux for when I'm on my school chromebook or not in a graphical enviornment with tiling window management. This nice plugin makes it easy to get keybinds simmilar to dwm and it's a nice set-and-forget.</li>
	</ul>
</div>

<style>
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
		}
	}
</style>
