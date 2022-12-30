import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';





export const createScene = (canvas, video) => {
	let renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
	let composer = new EffectComposer(renderer);
	const scene = new THREE.Scene();


	let dt = 0;

	const animate = () => {
		requestAnimationFrame(animate);
		composer.render(scene, camera);
		let radius = 1 + 40*Math.abs(Math.sin(dt/10000));
		halftonePass.uniforms[ 'radius' ].value = radius;
		let scatter = 0 + 1*Math.abs(Math.cos(dt/1000));
		halftonePass.uniforms[ 'scatter' ].value = scatter;
		dt++;
	};

	const resize = () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;


	const texture = new THREE.VideoTexture(video);
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

		const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

		navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {

			// apply the stream to the video element used in the texture

			video.srcObject = stream;
			video.play();

		}).catch(function (error) {

			console.error('Unable to access the camera/webcam.', error);

		});

	} else {

		console.error('MediaDevices interface not available.');

	}
	scene.background = texture;

	let sceneRenderPass = new RenderPass(scene, camera);
	sceneRenderPass.renderToScreen = true;
	sceneRenderPass.clearDepth = false;
	sceneRenderPass.clear = false;
	composer.addPass(sceneRenderPass);
	const params = {
		shape: 1,
		radius: 10,
		rotateR: 14,
		rotateB: 45,
		rotateG: 29,
		scatter: 0,
		blending: 1,
		blendingMode: 1,
		greyscale: false,
		disable: false
	};
	const halftonePass = new HalftonePass(window.innerWidth, window.innerHeight, params);
	composer.addPass(halftonePass);
	let afterimagePass = new AfterimagePass();
	composer.addPass( afterimagePass );

	resize();
	animate();


	window.addEventListener('resize', resize);
};
