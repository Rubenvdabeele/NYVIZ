<script>
	import "@fontsource/rubik-bubbles"
	import { onMount } from 'svelte';
	import { createScene } from '../lib/scene.js';

	let canvas;

	let video;

	let time = new Date();

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();
	$: timeString = time.toLocaleTimeString();

	onMount(() => {
		createScene(canvas, video);
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Three.js Sveltekit</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<canvas id="three" bind:this={canvas} />

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} id="video" style="display:none" autoplay playsinline></video>

<div id="timerContainer">
	<p id="timer">{timeString}</p>
</div>

<style>


	#three{
		z-index: 0;
		position: fixed;
		top:0;
		left:0;
	}

	#timerContainer{
		display: grid;
		grid-template-rows: 100%;
 		grid-template-columns: 100%;
		justify-items: center;
  		align-items: center;
		width: 100%;
		height: 100%;
		z-index: 1;
		position: relative;
	}

	#timer{
		font-family: "Rubik Bubbles", cursive;;
		text-align: center;
		font-size: 10em;
		color: #f7e132;
	}
</style>
