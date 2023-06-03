<template>
  <div class="poke-card">
    <div class="image-container">
      <img :src=imageUrl />
    </div>
    <div class="card-content">
      <div class="card-text">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pokemonTeamCard',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  }
};
</script>
