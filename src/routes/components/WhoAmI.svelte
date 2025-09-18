<script lang="ts">
	import { currentTheme } from "../themes.js";
</script>

<div id="whoAmI" style="--foreground: {$currentTheme.foreground}; --red: {$currentTheme.red}; --green: {$currentTheme.green}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --orange: {$currentTheme.orange};">
	<h2>&lt;<span>WhoAmI</span>&gt;</h2>
	<p>I am <em>H<span>a</span>rr<span>i</span>s<span>o</span>n D<span>iA</span>mbr<span>o</span>s<span>io</span></em>, a programmer who appreciates the elegance of simple computer systems. As a student at Worcester Polytechnic Institute, my work is infused with the ideals UNIX Philosophy, while embracing modern systems technologies to fuel an addiction to constant exploration. <h3>Technologies, Dotfiles, and Software I like</h3>
	<ul>
		<li><a target="_blank" href="https://github.com/EggbertFluffle/nvim"><strong>Neovim</strong></a> - Crown jewel of a text editor and the only way I can type now.</li>
		<li><a target="_blank" href="https://voidlinux.org/"><strong>Linux (Void, Debian)</strong></a> - Let's be real, distros they're all the same</li>
		<li><a target="_blank" href="https://dwm.suckless.org/"><strong>dwm</strong></a> - Aura-farming window manager, and a beautiful piece of software.</li>
		<li><a target="_blank" href="https://zen-browser.app/"><strong>zen</strong></a> - Dang gum, finding a good web-browser is tough. This one is alright I suppose.</li>
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
		font-size: 2.25rem;
		margin-block: 1rem;
		margin-inline: 1rem;
	}

	p {
		text-indent: 5rem;
		font-size: 1.5rem;
		margin-inline: 2.5rem;
	}

	em > span {
		color: var(--red);
	}

	ul {
		font-size: 1.5rem;
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
