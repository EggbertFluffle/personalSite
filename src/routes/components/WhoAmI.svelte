<script lang="ts">
	import { currentTheme } from "../themes.js";
</script>

<div id="whoAmI" style="--foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --green: {$currentTheme.green}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --orange: {$currentTheme.orange};">
	<h2>&lt;<span>WhoAmI</span>&gt;</h2>
	<p>I am <em>H<span>a</span>rr<span>i</span>s<span>o</span>n D<span>iA</span>mbr<span>o</span>s<span>io</span></em> and I really love to program, that's it. Currently, I study Computer Science at Worcester Polytechnic Institute, where I enjoy talking to other nerds about all things programming, GNU/Linux, open source, creative coding and language design.
	<h3>Technologies, Dotfiles, and Software I like</h3>
	<ul>
		<li><a target="_blank" href="https://github.com/EggbertFluffle/nvim"><strong>Neovim</strong></a> - Crown jewel of a text editor and the only way I can type now.</li>
		<li><a target="_blank" href="https://voidlinux.org/"><strong>Linux (Void, Debian)</strong></a> - Let's be real, distros they're all the same</li>
		<li><a target="_blank" href="https://dwm.suckless.org/"><strong>dwm</strong></a> - Aura-farming window manager, and a beautiful piece of software.</li>
		<li><a target="_blank" href="https://zen-browser.app/"><strong>zen</strong></a> - Dang gum, finding a good web-browser is tough. This one is alright I suppose.</li>
		<!-- <li><a target="_blank" href="https://github.com/tsoding/boomer"><strong>boomer</strong></a> - A zooming utility for Linux built in Nim. Super satisfying to use and love the easing when zooming. Also, pround to support <a href="https://www.youtube.com/@TsodingDaily">Tsoding's videos</a>. Good ol' entertainment.</li> -->
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
		font-size: 5rem;
	}

	h2 > span {
		color: var(--green);
	}

	h3 {
		font-size: 2rem;
		margin-block: 1rem;
		margin-inline: 1rem;
	}

	p {
		text-indent: 5rem;
		font-size: 1.25rem;
		margin-inline: 2.5rem;
	}

	em > span {
		color: var(--red);
	}

	ul {
		font-size: 1.25rem;
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
			font-size: 3rem;
			text-align: center;
		}

		p {
			text-indent: 2rem;
			font-size: 1rem;
			margin-inline: 2rem;
			margin-block: 1rem;
		}

		h3 {
			font-size: 1.5rem;
			text-align: center;
		}

		ul {
			font-size: 1rem;
			margin: 2rem;
			margin-inline: 2rem;
			margin-block: 1rem;
			list-style: none;
			text-indent: 1rem;
		}
	}
</style>
