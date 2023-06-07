<template>
  <div v-show="modalActive" class="modal-overlay">
    <div v-show="modalActive" class="modal">
      <div class="header">
        <h1>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</h1>
        <button @click="close">X</button>
      </div>
      <div class="image-stats">
        <img v-bind:src="imageUrl" />
      </div>
      <div class="fields-buttons">
        <div class="selects">
          <div class="ability-select">
            Ability:
            <select v-model="selectedAbility">
              <option
                v-for="(value, key) in abilities"
                :key="key"
                :value="value"
              >
                {{ value.ability.name }}
              </option>
            </select>
          </div>
          <div class="moves-select">
            <p>Moves:</p>
            <select
              v-for="index in 4"
              :key="index"
              :class="'move' + index"
              v-model="selectedMoves['move' + index]"
            >
              <option v-for="(value, key) in moves" :key="key" :value="value">
                {{ value.move.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="buttons">
          <button v-if="!inTeam" @click="addPokemon">Add to team</button>
          <button v-if="inTeam" @click="updatePokemon">Update</button>
          <button v-if="inTeam" @click="removePokemon">Remove from team</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChosenTeamStore } from "@/stores/chosenTeam";

export default {
  props: ["modalActive", "pokemonId", "inTeam", "index"],
  data() {
    return {
      name: "",
      abilities: [],
      moves: [],
      evs: { ps: 0, atk: 0, def: 0, spatk: 0, spdef: 0, spe: 0 },
      maxSum: 510,
      maxEv: 255,
      chosenTeamStore: useChosenTeamStore(),
      selectedAbility: "",
      selectedMoves: { move1: "", move2: "", move3: "", move4: "" },
    };
  },
  watch: {
    modalActive(value) {
      if (value) {
        this.fetchData(this.pokemonId); // Call fetchData with the pokemonId prop
        if (!this.inTeam) {
          this.selectedAbility = "";
          this.selectedMoves = { move1: "", move2: "", move3: "", move4: "" };
        } else {
          const chosenPokemon = this.chosenTeamStore.team[this.index];
          this.selectedAbility = chosenPokemon.ability;
          this.selectedMoves = chosenPokemon.moves;
        }
      }
    },
  },
  methods: {
    fetchData(id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.name = data.forms[0].name;
          this.abilities = data.abilities;
          this.moves = data.moves;
          this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    close() {
      this.$emit("close");
    },
    addPokemon() {
      const pokemonData = {
        id: this.pokemonId,
        imageUrl: this.imageUrl,
        name: this.name,
        ability: JSON.parse(JSON.stringify(this.selectedAbility)),
        moves: JSON.parse(JSON.stringify(this.selectedMoves)),
        evs: this.evs,
      };
      this.chosenTeamStore.addPokemonToTeam(pokemonData);
      this.$emit("close");
    },
    removePokemon() {
      this.chosenTeamStore.removePokemonFromTeam(this.index);
      this.$emit("close");
    },
    updatePokemon() {
      const pokemonData = {
        id: this.pokemonId,
        imageUrl: this.imageUrl,
        name: this.name,
        ability: JSON.parse(JSON.stringify(this.selectedAbility)),
        moves: JSON.parse(JSON.stringify(this.selectedMoves)),
        evs: this.evs,
      };
      this.chosenTeamStore.updatePokemonInTeam(pokemonData);
      this.$emit("close");
    },
  },
};
</script>
