<template>
  <div class="trainer">
    <div class="image-container">
      <img :src="getTrainerImage" />
    </div>
    <select v-model="trainerName" id="trainerDropdown"></select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TrainerCard",
  data() {
    return {
      trainerName: "aaron",
    };
  },
  async mounted() {
    const dropdown = document.getElementById("trainerDropdown");
    await axios
      .get("../../trainers.txt")
      .then((response) => response.data)
      .then((data) => {
        const options = data.split("\n");
        options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          dropdown.appendChild(optionElement);
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  },
  computed: {
    getTrainerImage() {
      return `https://play.pokemonshowdown.com/sprites/trainers/${this.trainerName}.png`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
