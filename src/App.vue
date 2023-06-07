<template>
  <TrainerTeam/>
  <SearchComponent />
</template>

<script>
import TrainerTeam from './components/TrainerTeam.vue'
import SearchComponent from "./components/SearchComponent.vue";

export default {
  name: "App",
  components: {
    TrainerTeam,
    SearchComponent
  },
};
</script>