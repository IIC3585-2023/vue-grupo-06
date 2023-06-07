<template>
  <div v-show="modalActive" class="modal-overlay">
    <div v-show="modalActive" class="modal">
      <h1> {{name.charAt(0).toUpperCase() + name.slice(1)}} </h1>
      <div class="image-stats">
        <img v-bind:src="imageUrl">
        <div class="evs">
          <div class="ev">
            ps: <input type="number" v-model.number="evs.ps" @input="limitSum('ps', $event.target.value)" @click="selectValue($event.target)" />
          </div>
          <div class="ev">
            atk: <input type="number" v-model.number="evs.atk" @input="limitSum('atk', $event.target.value)" @click="selectValue($event.target)" />
          </div>
          <div class="ev">
            def: <input type="number" v-model.number="evs.def" @input="limitSum('def', $event.target.value)" @click="selectValue($event.target)" />
          </div>
          <div class="ev">
            spatk: <input type="number" v-model.number="evs.spatk" @input="limitSum('spatk', $event.target.value)" @click="selectValue($event.target)" />
          </div>
          <div class="ev">
            spdef: <input type="number" v-model.number="evs.spdef" @input="limitSum('spdef', $event.target.value)" @click="selectValue($event.target)" />
          </div>
          <div class="ev">
            spe: <input type="number" v-model.number="evs.spe" @input="limitSum('spe', $event.target.value)" @click="selectValue($event.target)" />
          </div>
        </div>      
      </div>
      <div class="fields-buttons">
        <div class="selects">
          <div>ability: 
            <select v-model="selectedAbility">
              <option v-for="(value, key) in abilities" :key="key" :value="value">
                {{ value.ability.name }}
              </option>
            </select>
          </div>
          <select v-for="index in 4" :key="index" :class="'move'+index" v-model="selectedMoves['move' + index]">
            <option v-for="(value, key) in moves" :key="key" :value="value">
                {{ value.move.name }}
            </option>
          </select>
        </div>
        <div class="buttons">
          <button v-if="!inTeam" @click="addPokemon">Add to team</button>
          <button v-if="inTeam" @click="updatePokemon">Update</button>
          <button v-if="inTeam" @click="removePokemon">Remove from team</button>
          <button @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChosenTeamStore } from '@/stores/chosenTeam'

export default {
    props: ['modalActive', 'pokemonId', 'inTeam', 'index'],
    data() {
      return {
        name: '',
        abilities: [],
        moves: [],
        evs: {'ps': 0, 'atk': 0, 'def': 0, 'spatk': 0, 'spdef': 0, 'spe':0},
        maxSum: 510,
        maxEv: 255,
        chosenTeamStore: useChosenTeamStore(),
        selectedAbility: '',
        selectedMoves: { move1: '', move2: '', move3: '', move4: '' }
      }
    },
    watch: {
      modalActive(value) {
        if (value) {
          this.fetchData(this.pokemonId);  // Call fetchData with the pokemonId prop
          if (!this.inTeam) {
            this.selectedAbility= '';
            this.selectedMoves= { move1: '', move2: '', move3: '', move4: '' };
            this.evs = {'ps': 0, 'atk': 0, 'def': 0, 'spatk': 0, 'spdef': 0, 'spe':0};
          } else {
            const chosenPokemon = this.chosenTeamStore.team[this.index]
            this.selectedAbility = chosenPokemon.ability;
            this.selectedMoves = chosenPokemon.moves;
            this.evs = chosenPokemon.evs;
          }
        }
      },
    },
    methods: {
      fetchData(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then(response => response.json())
          .then(data => {
            this.name = data.forms[0].name;
            this.abilities = data.abilities;
            this.moves = data.moves;
            this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      limitSum(attribute, value) {
        this.evs[attribute] = parseInt(value) || 0;
        const sum = Object.values(this.evs).reduce((acc, cur) => acc + cur, 0);
        const maxTotal = 510;
        if (sum > maxTotal) {
          const remainingSum = maxTotal - (sum - this.evs[attribute]);
          this.evs[attribute] = remainingSum
        } if ( this.evs[attribute] > 255) { this.evs[attribute] = 255 }
      },
      selectValue(target) {
        target.select();
      },
      close() {
        this.$emit('close');
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
        this.$emit('close');
      },
      removePokemon() {
        this.chosenTeamStore.removePokemonFromTeam(this.index);
        this.$emit('close');
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
        this.$emit('close');
      },
    },
}
</script>