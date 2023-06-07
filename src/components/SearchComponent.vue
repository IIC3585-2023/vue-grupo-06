<template>
  <div class="search-component">
    <input v-model="search" placeholder="Search by name" class="searchbox" />
    <div class="types">
      <div v-for="type in types" :key="type" class="checkbox-container">
        <input type="checkbox" :value="type" v-model="selectedTypes" />
        <span
          class="pokeball"
          v-if="selectedTypes.includes(type) && isChecked(type)"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
            alt="Pokeball"
            @click="uncheck(type)"
          />
        </span>
        {{ type }}
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-item" v-for="item in filteredList" :key="item.id">
        <PokemonInGrid
          :imageUrl="item.imageUrl"
          :name="item.name"
          :id="item.id"
          @open-modal="openModal"
        />
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
          id: details.data.id,
        };
      })
    );
    this.list = listWithDetails;
  },
  methods: {
    openModal(id) {
      this.$emit("open-modal", id);
    },
    uncheck(type) {
      const index = this.selectedTypes.indexOf(type);
      if (index !== -1) {
        this.selectedTypes.splice(index, 1);
      }
    },
  },
  computed: {
    filteredList() {
      if (!this.search && !this.selectedTypes.length) {
        return [];
      }
      return this.list.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.search.toLowerCase()) &&
          (!this.selectedTypes.length ||
            item.types.some((type) => this.selectedTypes.includes(type)))
        );
      });
    },
    isChecked() {
      return (type) => this.selectedTypes.includes(type);
    },
  },
};
</script>
