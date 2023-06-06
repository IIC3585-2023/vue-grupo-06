<template>
  <div>
    <input v-model="search" placeholder="Search by name" />
    <div class="types">
      <div v-for="type in types" :key="type">
        <input type="checkbox" :value="type" v-model="selectedTypes" />
        {{ type }}
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-item" v-for="item in filteredList" :key="item.id">
        <PokemonInGrid :imageUrl="item.imageUrl" :name="item.name" />
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
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
    );
    const listWithDetails = await Promise.all(
      response.data.results.map(async (item) => {
        const details = await axios.get(item.url);
        return {
          ...item,
          imageUrl: details.data.sprites.front_default,
          types: details.data.types.map((type) => type.type.name),
        };
      })
    );
    this.list = listWithDetails;
  },
  computed: {
    filteredList() {
      return this.list.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.search.toLowerCase()) &&
          (!this.selectedTypes.length ||
            item.types.some((type) => this.selectedTypes.includes(type)))
        );
      });
    },
  },
};
</script>
