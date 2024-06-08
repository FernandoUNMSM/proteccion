<template>
  <div class="chartContainer">
    <!-- <button @click="opcion">asdasdda</button>
    <button @click="series">asdasdda2222</button> -->
    <apexchart :options="IrOptions" :series="IrSeries"></apexchart>
    <!-- <div class="cRow">
      <div class="cCol">
        <apexchart :options="uvOptions" :series="uvSeries"></apexchart>
      </div>
      <div class="cCol">
        <apexchart :options="irOptions" :series="irSeries"></apexchart>
      </div>
    </div>
    <div class="cRow">
      <div class="cCol">
        <apexchart :options="cpOptions" :series="cpSeries"></apexchart>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Charts",
  computed: {
    ...mapGetters(['IrSeries', 'IrOptions']),
    uvSeries() {
      return this.$store.getters.UvSeries;
    },
    uvOptions() {
      return this.$store.getters.UvOptions;
    },
    // irSeries() {
    //   return this.$store.getters.IrSeries;
    // },
    // irOptions() {
    //   return this.$store.getters.IrOptions;
    // },
    cpSeries() {
      return this.$store.getters.CpSeries;
    },
    cpOptions() {
      return this.$store.getters.CpOptions;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartContainer{
  margin-top: 0px;
}
.cRow {
  display: flex;
  column-gap: 20px;
  align-items: center;
  justify-content: center;
}
.cCol {
  width: 50%;
  max-width: 50%;
}
.apexcharts-tooltip {
  opacity: 1 !important;
}
</style>
