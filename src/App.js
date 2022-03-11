import { useState, useEffect } from "react";
import "./App.css";
import ThreeD from "./components/ThreeD";

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/.netlify/functions/googlesheets`);
			let data = await response.json();
			data.items.forEach((item, i) => {
				item.id = i;
				item.DatetimeObject = new Date(item["Date \n(formated DD Month YYYY)"]);
			});
			data.items.sort(function (a, b) {
				return a.DatetimeObject - b.DatetimeObject;
			});

			setItems(data.items);
		};

		fetchData();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>FemOS Timeline</h1>
			</header>
			<div id="threed">
				<ThreeD items={items} />
			</div>
		</div>
	);
}

export default App;
