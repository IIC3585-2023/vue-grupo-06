<template>
  <div v-for="pokemon of team" :key="pokemon">
		<PokemonCard 
      :pokemonInfo="pokemon"
      @open-modal="openModal"
		/>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue'
import { useChosenTeamStore } from '@/stores/chosenTeam'

export default {
  name: 'PokemonTeam',
	components: {
    PokemonCard
  },
	data() {
		return {
      team: []
		}
	},
  mounted() {
    this.team = useChosenTeamStore().team
  },
  methods: {
    openModal(id, index) {
      this.$emit('open-modal', id, index);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
