<script>
    import { currentTheme } from "../themes";
</script>

<div id="contact" style="--foreground: {$currentTheme.foreground}; --orange: {$currentTheme.orange}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --cyan: {$currentTheme.cyan};">
	<h2>&lt;<span>Contact</span>&gt;</h2>
	<ul>
		<li>Github: <a href="https://github.com/EggbertFluffle/">EggbertFluffle</a></li>
		<li>E-Mail (personal): hdiambrosio@gmail.com</li>
		<li>E-Mail (school): hadiambrosio@wpi.edu</li>
		<li>LinkedIn: <a href="https://www.linkedin.com/in/harrison-diambrosio-505443229/">Harrison DiAmbrosio</a></li>
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
		color: var(--cyan);
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
			font-size: 1.25rem;
			margin-inline: 2rem;
		}
	}
</style>
