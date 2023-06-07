import { defineStore } from 'pinia'

export const useChosenTeamStore = defineStore('chosenTeam', {
  state: () => ({ team: [] }),
  getters: {
    getPokemonIndex: (state) => {
      return (pokemon) => state.team.findIndex((pokemonInTeam) => pokemonInTeam === pokemon);
    }
  },
  actions: {
    addPokemonToTeam(pokemon) {
      if (this.team.length < 6) {
        this.team.push(pokemon)
      }
    },
    removePokemonFromTeam(index) {
      this.team.splice(index, 1)
    },
    updatePokemonInTeam(pokemon) {
      const index = this.team.findIndex((pokemonInTeam) => pokemonInTeam === pokemon);
      this.team.splice(index, 1, pokemon)
    }
  }
})
