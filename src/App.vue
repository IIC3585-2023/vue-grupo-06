<template>
  <TrainerTeam @open-modal="editPokemonCard" />
  <AddModal
    @close="toggleModal"
    :modalActive="modalActive"
    :pokemonId="selectedPokemonId"
    :inTeam ="inTeam"
    :index = "currentIndex"
  />
  <SearchComponent @open-modal="toggleModal" />
</template>

<script>
import TrainerTeam from './components/TrainerTeam.vue'
import SearchComponent from './components/SearchComponent.vue'
import AddModal from './components/AddModal.vue'

export default {
  name: "App",
  components: {
    TrainerTeam,
    SearchComponent,
    AddModal
  },
  data() {
    return {
      items: [],
      selectedPokemonId: null,
      modalActive: false,
      inTeam: false,
      currentIndex: 0,
    }
  },
  methods: {
    editPokemonCard(id, index) {
      this.toggleModal(id);
      this.inTeam = true;
      this.currentIndex = index;
    },
    toggleModal(id) {
      this.inTeam = false;
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
  mounted() {
    this.fetchItems();
  }
}
</script>