<template>
  <div v-for="pokemon of chosenPokemon" :key="pokemon">
		<PokemonCard 
			:imageUrl="pokemon.imageUrl"
			:title="pokemon.title"
			:description="pokemon.description"
		/>
  </div>
	<PokemonCard 
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/756.png" 
    title="Pokecarta"
    description="Descripcion"
  />
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
