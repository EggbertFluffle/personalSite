<script>
	import { currentTheme } from "../themes";
</script>

<nav>
	<a href="/#whoAmI">{"<"}<span style="color: {$currentTheme.green}">WhoAmI</span>{">"}</a>
	<a href="#blog">{"<"}<span style="color: {$currentTheme.orange}">Blog</span>{">"}</a>
	<!-- <a href="/">{"<"}<span style="color: {$currentTheme.yellow}">Projects</span>{">"}</a> -->
	<a href="/#contact">{"<"}<span style="color: {$currentTheme.cyan}">Contact</span>{">"}</a>
</nav>

<style>
	nav {
		display: flex;
		float: right;
		flex-direction: column;
		align-items: flex-end;
		scroll-behavior: smooth;
		flex-grow: 1;
	}

	a {
		font-size: calc(2rem + 2vw);
		text-decoration: none;
		color: #ebdbb2;
	}

	a::after {
		display: block;
		content: "";
		float: right;
		width: 0.1%;
		height: 4px;
		background-color: #ebdbb2;
		transition: ease-in-out width 0.1s;
	}


	a:hover::after {
		width: 100%;
	}

	@media (max-width: 666px) {
		nav {
			align-items: center;
		}

		a::after {
			display: none;
		}
	}
</style>
