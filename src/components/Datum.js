import React, { Suspense, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

function Datum(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	let position = [
		props.item.DatetimeObject.getTime() / 1000000000000.0 +
			2 * props.item.id -
			60,
		0,
		0,
	];

	const { camera } = useThree();

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<group position={position} scale={active ? 1.5 : 1}>
			<mesh
				ref={mesh}
				scale={0.5}
				onClick={(event) => {
					setActive(!active);
					if (!active) {
						camera.position.x = position[0] + 20;
						camera.position.y = position[1] + 20;
						camera.position.z = position[2];
						camera.lookAt({
							x: position[0] + 30,
							y: position[1] + 30,
							z: position[2] - 10,
						});
					} else {
						camera.position.x = 50;
						camera.position.y = 20;
						camera.position.z = 20;
						camera.lookAt({ x: 0, y: 0, z: 0 });
					}
				}}
				onPointerOver={(event) => setHover(true)}
				onPointerOut={(event) => setHover(false)}
			>
				<sphereGeometry args={[1, 32]} />
				<meshPhysicalMaterial color={hovered || active ? "red" : "yellow"} />
			</mesh>
			<Suspense fallback={null}>
				<Text
					color="white"
					anchorX="left"
					anchorY="bottom"
					rotation={[0, Math.PI / 2, 0]}
					position={[0, -2, -2]}
					scale={10}
					maxWidth={2}
					fillOpacity={active ? 1 : 0.4}
				>
					{props.item["Timeline entry title"] + ": "}
					{"\n"}
					{props.item["Date \n(formated DD Month YYYY)"] + ": "}
					{"\n"}
					{active ? props.item["Description (optional)"] : null}
				</Text>
			</Suspense>
		</group>
	);
}

export default Datum;
