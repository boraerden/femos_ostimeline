<script>
	import * as SC from "svelte-cubed";
	import * as THREE from "three";
	export let item, hdrEquirect;
</script>

<!-- 
<h2>
	{item["Date \n(formated DD Month YYYY)"]}: {item["Timeline entry title"]}
</h2>
<h3>
	{item["Description (optional)"]}
</h3>
<br /> -->

<SC.Mesh
	geometry={new THREE.SphereGeometry()}
	material={new THREE.MeshPhysicalMaterial({
		roughness: 0.2,
		transmission: 0.5,
		thickness: 1.9,
		envMap: hdrEquirect,
		envMapIntensity: 1.1,
	})}
	position={[item.DatetimeObject.getTime() / 100000000000.0, 1, 0]}
	scale={[0.25, 0.25, 0.25]}
	receiveShadow
/>

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
