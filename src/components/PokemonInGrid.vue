<template>
  <div class="pokemon-in-grid" @click="openModal(id)">
    <div class="pokemon-in-grid__image">
      <img :src="imageUrl" alt="pokemon" />
    </div>
    <div class="pokemon-in-grid__name">{{ name.charAt(0).toUpperCase() + name.slice(1) }}</div>
  </div>
</template>

<script>
export default {
  name: "PokemonInGrid",
  props: {
    id: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  methods: {
    openModal(id) {
      this.$emit('open-modal', id);
    },
  },
};
</script>
