<template>
  <TrainerTeam/>
  <PokemonCard
    :id = "3" 
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" 
    title="Pokecarta"
    description="Descripcion"
    @open-modal="toggleModal"  
  />
  <PokemonCard
    :id = "5" 
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" 
    title="Pokecarta"
    description="Descripcion"  
    @open-modal="toggleModal"
  />
  <AddModal
    @close="toggleModal" 
    :modalActive="modalActive"
    :pokemonId="selectedPokemonId"  
  />
  <SearchComponent />
</template>

<script>
import TrainerTeam from './components/TrainerTeam.vue'
import SearchComponent from "./components/SearchComponent.vue"
import PokemonCard from './components/PokemonCard.vue'
import AddModal from './components/AddModal.vue'
import {ref} from 'vue'

export default {
  name: "App",
  components: {
    TrainerTeam,
    SearchComponent,
    PokemonCard,
    AddModal
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