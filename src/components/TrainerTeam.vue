<template>
  <TrainerCard/>
  <PokemonTeam @open-modal="openModal"/>
</template>

<script>
import TrainerCard from './TrainerCard.vue'
import PokemonTeam from './PokemonTeam.vue'

export default {
  name: 'TrainerTeam',
  components: {
    TrainerCard,
    PokemonTeam
  },
  methods: {
    openModal(id, index) {
      this.$emit('open-modal', id, index);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>