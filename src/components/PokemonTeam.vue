<template>
  <div v-for="pokemon of chosenPokemon" :key="pokemon">
		<PokemonCard 
			:imageUrl="pokemon.imageUrl"
			:title="pokemon.title"
			:description="pokemon.description"
		/>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue'

export default {
  name: 'PokemonTeam',
	components: {
    PokemonCard
  },
	data() {
		return {
			chosenPokemon: []
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
