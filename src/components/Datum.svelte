<script>
	import * as SC from "svelte-cubed";
	import * as THREE from "three";
	import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
	export let item, hdrEquirect;
	import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

	let font_geometry;
	const font = new FontLoader().load(
		"optimer_regular.typeface.json",
		(font) => {
			const font_matLite = new THREE.MeshBasicMaterial({
				color: "red",
				transparent: true,
				opacity: 0.4,
				side: THREE.DoubleSide,
			});
			const shapes = font.generateShapes("bora", 100);

			font_geometry = new THREE.ShapeGeometry(shapes);

			const lineText = new THREE.Object3D();

			for (let i = 0; i < shapes.length; i++) {
				const shape = shapes[i];

				const points = shape.getPoints();
				const font_geometry = new THREE.BufferGeometry().setFromPoints(points);

				font_geometry.translate(0, 0, 0);

				const lineMesh = new THREE.Line(font_geometry, font_matLite);
				lineText.add(lineMesh);
			}
		}
	);
</script>

<!-- 
<h2>
	{item["Date \n(formated DD Month YYYY)"]}: {item["Timeline entry title"]}
</h2>
<h3>
	{item["Description (optional)"]}
</h3>
<br /> -->

<SC.Group>
	<SC.Mesh
		geometry={new THREE.SphereGeometry()}
		material={new THREE.MeshPhysicalMaterial({
			roughness: 0.2,
			transmission: 0.5,
			thickness: 1.9,
			envMap: hdrEquirect,
			envMapIntensity: 1.1,
		})}
		position={[item.DatetimeObject.getTime() / 100000000000.0, 0, 0]}
		scale={[0.25, 0.25, 0.25]}
		receiveShadow
	/>

	{#if font_geometry !== null}
		<SC.Primitive
			object={font_geometry}
			position={[item.DatetimeObject.getTime() / 100000000000.0, 5, 0]}
		/>
	{/if}
</SC.Group>

<style>
	/* h2 {
		color: rgb(218, 7, 7);
		font-weight: 150;
	}

	h3 {
		color: rgb(141 141 141);
		font-weight: 150;
	} */
</style>
