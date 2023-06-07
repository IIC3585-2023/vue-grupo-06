<template>
  <pokemonTeamCard
    :id = "3" 
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" 
    title="Pokecarta"
    description="Descripcion"
    @open-modal="toggleModal"  
  />
  <pokemonTeamCard
    :id = "5" 
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" 
    title="Pokecarta"
    description="Descripcion"  
    @open-modal="toggleModal"
  />
  <AppModal
    @close="toggleModal" 
    :modalActive="modalActive"
    :pokemonId="selectedPokemonId"  
  />
</template>

<script>
import pokemonTeamCard from './components/pokemonTeamCard.vue'
import AppModal from './components/AddModal.vue'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    pokemonTeamCard,
    AppModal
  },
  data() {
      return {
        items: [],
        selectedPokemonId: null
      }
    },
  methods: {
    toggleModal(id) {
      this.selectedPokemonId = id; 
      this.modalActive = !this.modalActive;
    },
    fetchItems() {
         fetch(`https://pokeapi.co/api/v2/item?limit=2050`)
        .then(response => response.json())
        .then(data => {
          this.items = data.results;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }
  },
  setup() {
    const modalActive = ref(false);

    return { modalActive }
  },
  mounted() {
    this.fetchItems();
  }
}
</script>