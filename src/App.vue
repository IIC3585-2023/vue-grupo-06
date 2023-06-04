<template>
  <pokemonTeamCard
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/756.png"
    title="Pokecarta"
    description="Descripcion"
  />
  <pokemonTeamCard
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/756.png"
    title="Pokecarta"
    description="Descripcion"
  />
  <pokemonTeamCard
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/756.png"
    title="Pokecarta"
    description="Descripcion"
  />
  <div><SearchComponent /></div>
</template>

<script>
import pokemonTeamCard from "./components/pokemonTeamCard.vue";
import SearchComponent from "./components/SearchComponent.vue";

export default {
  name: "App",
  components: {
    pokemonTeamCard,
    SearchComponent,
  },
};
</script>
