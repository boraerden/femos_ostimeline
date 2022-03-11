import { useState, useEffect } from "react";
import "./App.css";
import ThreeD from "./components/ThreeD";

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/.netlify/functions/googlesheets`);
			// const response = await fetch(
			// 	`https://jsonplaceholder.typicode.com/todos/1`
			// );
			let data = await response.json();
			console.log(data);
			data.items.forEach((item) => {
				item.DatetimeObject = new Date(item["Date \n(formated DD Month YYYY)"]);
			});
			data.items.sort(function (a, b) {
				return a.DatetimeObject - b.DatetimeObject;
			});

			setItems(data);
		};

		fetchData();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>FemOS Timeline</h1>
			</header>
			<ThreeD />
			<ul>
				{items.map((item) => (
					<li key={item.DatetimeObject}>{item.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
