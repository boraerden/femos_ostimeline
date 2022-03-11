import React, { useRef, useState } from "react";
import { Html } from "@react-three/drei";

function Datum(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<group
			position={[props.item.DatetimeObject.getTime() / 100000000000.0, 0, 0]}
		>
			<mesh
				ref={mesh}
				scale={active ? 1.5 : 1}
				onClick={(event) => setActive(!active)}
				onPointerOver={(event) => setHover(true)}
				onPointerOut={(event) => setHover(false)}
			>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
			</mesh>
			<Html
				transform
				// We just interpolate the visible state into css opacity and transforms
				rotation={[0, Math.PI / 2, 0]}
				style={{ pointerEvents: "none" }}
			>
				{props.item["Date \n(formated DD Month YYYY)"]}:{" "}
				{props.item["Timeline entry title"]}
			</Html>
		</group>
	);
}

export default Datum;
