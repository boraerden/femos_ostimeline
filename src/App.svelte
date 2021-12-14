<script>
	const fetchSpreadsheetData = (async () => {
		const response = await fetch(`/.netlify/functions/googlesheets`);
		let data = await response.json();
		data.items.forEach((item) => {
			item.DatetimeObject = new Date(
				item["Date \n(formated DD Month YYYY)"]
			);
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
		{#each data.items as item}
			<h2>
				{item["Date \n(formated DD Month YYYY)"]}: {item[
					"Timeline entry title"
				]}
			</h2>
			<h3>
				{item["Description (optional)"]}
			</h3>
			<br />
		{/each}
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
		color: rgb(218, 7, 7);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		color: rgb(218, 7, 7);
		font-weight: 150;
	}

	h3 {
		color: rgb(141 141 141);
		font-weight: 150;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
