<template>
  <div class="pokemon-in-grid">
    <div class="pokemon-in-grid__image">
      <img :src="imageUrl" alt="pokemon" />
    </div>
    <div class="pokemon-in-grid__name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "PokemonInGrid",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
