<script>
	export let name;

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

<main>
	<h1>Hello {name}!</h1>
	{#await fetchSpreadsheetData}
		<p>... fetching spreadsheet data ...</p>
	{:then data}
		{#each data.items as item}
			<h2>
				{item["Date \n(formated DD Month YYYY)"]}: {item[
					"Timeline entry title"
				]}
			</h2>
			<div>
				{item["Description (optional)"]}
			</div>
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
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		color: rgb(218, 7, 7);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
