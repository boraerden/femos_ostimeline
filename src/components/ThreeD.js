import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	useGLTF,
	Html,
	OrbitControls,
	Environment,
	ContactShadows,
} from "@react-three/drei";
import Datum from "./Datum";

function ThreeD(props) {
	const ref = useRef();
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			{props.items
				.filter((item) => item.DatetimeObject !== "Invalid date")
				.map((item) => (
					<Datum key={item.id} item={item} />
				))}
			<OrbitControls ref={ref} />
		</Canvas>
	);
}

export default ThreeD;
