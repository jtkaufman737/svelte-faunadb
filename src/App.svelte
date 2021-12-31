<script>
	import { onMount } from "svelte";

	let pokemon = [];
	const db = $$props.db; 
	const q = $$props.q;

	onMount(async () => {
		const response = await db.query(
			q.Map(
				q.Paginate(q.Documents(q.Collection("pokemon"))),
				q.Lambda(item => q.Get(item))
			)
		) 

		pokemon = response.data.map(item => {
			return item.data
		})
	})
</script>

<main id="app">
	<div class="home">
		<h3>Pokemon</h3>
		<section class="grid">
		   {#each pokemon as p}
			<div>
				<h6>{p.name}</h6>
				<img src={p.imageUrl} alt={p.name} class="pokemon"/>
			</div>
		   {/each}
		</section>
	</div>
</main>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3,h6 {
  font-family: acumin-pro,sans-serif;
  font-weight: 500;
  font-style: normal;
}

h3 {
  font-size:2em;
}

h6 {
  font-size:1em;
}

div.home {
  width:60%;
  margin:auto;
}

section.grid {
  display:grid;
  grid-template-columns:33.33% 33.33% 33.33%;
  grid-template-rows:auto;
  margin:auto;
  padding:5% 20% 5% 20%;
}

img.pokemon {
  height:100px;
  width:100px;
}
</style>