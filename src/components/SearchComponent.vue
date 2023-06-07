<template>
  <div class="search-component">
    <input v-model="search" placeholder="Search by name" />
    <div class="types">
      <div v-for="pokemonType in types" :key="pokemonType">
        <input type="checkbox" :value="pokemonType" v-model="selectedTypes" />
        {{ pokemonType }}
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-item" v-for="item in filteredList" :key="item.id">
        <PokemonInGrid :imageUrl="item.imageUrl" :name="item.name" :id="item.id" @open-modal="openModal" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PokemonInGrid from "./PokemonInGrid.vue";

export default {
  name: "SearchComponent",
  components: {
    PokemonInGrid,
  },
  data() {
    return {
      search: "",
      list: [],
      types: [
        "grass",
        "poison",
        "fire",
        "flying",
        "water",
        "bug",
        "normal",
        "electric",
        "ground",
        "fairy",
        "fighting",
        "psychic",
        "rock",
        "steel",
        "ice",
        "ghost",
        "dragon",
        "dark",
      ],
      selectedTypes: [],
    };
  },
  async created() {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1010"
    );
    const listWithDetails = await Promise.all(
      response.data.results.map(async (item) => {
        const details = await axios.get(item.url);
        return {
          ...item,
          imageUrl: details.data.sprites.front_default,
          types: details.data.types.map((type) => type.type.name),
          id: details.data.id,
        };
      })
    );
    this.list = listWithDetails;
  },
   methods: {
    openModal(id) {
      this.$emit('open-modal', id);
    },
  },
  computed: {
    filteredList() {
      if (!this.search && !this.selectedTypes.length){
        return []
      }
      return this.list.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.search.toLowerCase()) &&
          (!this.selectedTypes.length ||
            this.selectedTypes.every((type) => item.types.includes(type)))
        );
      });
    },
  },
};
</script>
