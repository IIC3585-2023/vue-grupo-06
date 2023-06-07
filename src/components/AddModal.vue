<template>
  <div v-show="modalActive" class="modal-overlay">
    <div v-show="modalActive" class="modal">
      <h1> {{name}} </h1>
      <div class="image-stats">
        <img v-bind:src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokemonId + '.png'">      
      </div>
      <div class="fields-buttons">
        <div class="selects">
          <div>ability: 
            <select>
              <option v-for="(value, key) in abilities" :key="key" :value="value">
                {{ value.ability.name }}
              </option>
            </select>
          </div>
          <select v-for="index in 4"  :key="index" :class="'move'+index">
            <option v-for="(value, key) in moves" :key="key" :value="value">
                {{ value.move.name }}
            </option>
          </select>
        </div>
        <div class="buttons">
          <button @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['modalActive', 'pokemonId'],
    data() {
      return {
        name: '',
        abilities: [],
        moves: [],
        evs: {'ps': 0, 'atk': 0, 'def': 0, 'spatk': 0, 'spdef': 0, 'spe':0},
        maxSum: 510,
        maxEv: 255,
      }
    },
    setup(props, {emit}) {
        const close = () =>{
            emit("close")
        }
        return { close }
    },
    // mounted() {
    // this.fetchData();
    // },
    watch: {
      modalActive(value) {
        if (value) {
          this.fetchData(this.pokemonId);  // Call fetchData with the pokemonId prop
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
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      },
    },
}
</script>