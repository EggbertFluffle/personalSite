<script>
    import { currentTheme } from "../themes";
</script>

<div id="contact" style="--foreground: {$currentTheme.foreground}; --orange: {$currentTheme.orange}; --background2: {$currentTheme.background2}; --yellow: {$currentTheme.yellow}; --cyan: {$currentTheme.cyan};">
	<h2>&lt;<span>Contact</span>&gt;</h2>
	<ul>
		<li>Github: <a href="https://github.com/EggbertFluffle/">https://github.com/EggbertFluffle</a></li>
		<li>E-Mail: <a href="mailto:hdiambrosio@gmail.com">hdiambrosio@gmail.com</a></li>
		<li>LinkedIn: <a href="https://www.linkedin.com/in/harrison-diambrosio-505443229/">Harrison DiAmbrosio</a></li>
	</ul>
</div>


<style>
	div {
		color: var(--foreground);
		margin-inline: 15rem;
	}

	h2 {
		font-size: 6rem;
	}

	ul {
		margin-inline: 10%;
		font-size: 1.75rem;
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
</style>
