<template>
  <TrainerCard/>
  <PokemonTeam/>
</template>

<script>
import TrainerCard from './TrainerCard.vue'
import PokemonTeam from './PokemonTeam.vue'

export default {
  name: 'TrainerTeam',
  components: {
    TrainerCard,
    PokemonTeam
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>