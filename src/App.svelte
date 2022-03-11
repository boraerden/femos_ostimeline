<script>
	import ThreeD from "./components/ThreeD.svelte";

	const fetchSpreadsheetData = (async () => {
		const response = await fetch(`/.netlify/functions/googlesheets`);
		let data = await response.json();
		data.items.forEach((item) => {
			item.DatetimeObject = new Date(item["Date \n(formated DD Month YYYY)"]);
		});
		data.items.sort(function (a, b) {
			return a.DatetimeObject - b.DatetimeObject;
		});
		return data;
	})();
</script>

<svelte:head>
	<title>FemOS Timeline</title>
</svelte:head>

<main>
	<h1>Open Source: a timeline</h1>
	{#await fetchSpreadsheetData}
		<p>... fetching spreadsheet data ...</p>
	{:then data}
		<ThreeD {data} />
	{:catch error}
		<p>An error occurred!</p>
	{/await}
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		position: relative;
		z-index: 2;
		color: rgb(218, 7, 7);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		pointer-events: none;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
