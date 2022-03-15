import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import Datum from "./Datum";

function ThreeD(props) {
	const orbitRef = useRef();
	return (
		<Canvas camera={{ fov: 75, position: [50, 20, 20] }}>
			<color attach="background" args={["#222222"]} />

			<OrbitControls ref={orbitRef} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			{props.items
				.filter((item) => !isNaN(item.DatetimeObject.getTime()))
				.map((item) => (
					<Datum key={item.id} item={item} />
				))}
			<Line
				points={[
					[-100000, 0, 0],
					[1000000, 0, 0],
				]}
				color="red"
				lineWidth={0.4}
			/>
		</Canvas>
	);
}

export default ThreeD;
