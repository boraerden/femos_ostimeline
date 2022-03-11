<script>
	import * as SC from "svelte-cubed";
	import * as THREE from "three";
	import Datum from "./Datum.svelte";

	export let data;

	$: console.log(data);

	const hdrEquirect = new THREE.TextureLoader().load(
		"constellation_figures.jpg",
		() => {
			hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
		}
	);
</script>

<div id="threed_container">
	<SC.Canvas antialias background={hdrEquirect} shadows>
		<SC.PerspectiveCamera position={[-2, 1, 1]} />
		<SC.OrbitControls />
		<SC.AmbientLight intensity={0.6} />
		<SC.DirectionalLight
			intensity={0.6}
			position={[-2, 3, 2]}
			shadow={{ mapSize: [2048, 2048] }}
		/>
		{#each data.items as item}
			<Datum {item} {hdrEquirect} />
		{/each}
	</SC.Canvas>
</div>

<style>
	#threed_container {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
