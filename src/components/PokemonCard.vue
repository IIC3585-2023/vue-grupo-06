<template>
  <div @click="openModal(pokemonInfo.id)" class="poke-card">
    <div class="image-container">
      <img :src=pokemonInfo.imageUrl />
    </div>
  </div>
</template>

<script>
import { useChosenTeamStore } from '@/stores/chosenTeam'

export default {
  name: 'PokemonCard',
  props: {
    pokemonInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chosenTeamStore: useChosenTeamStore()
    }
  },
  methods: {
    openModal(id) {
      const index = this.chosenTeamStore.getPokemonIndex(this.pokemonInfo)
      this.$emit('open-modal', id, index);
    },
  },
};
</script>
