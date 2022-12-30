<main>
	<slot />
</main>

<style>
	:global(html,body, main) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	:global(#svelteBody){
		width: 100%;
		height: 100%;
	}

	@font-face {
    font-family: 'RubikBubbles';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap') format(regular);
	}
</style>
