<template>
  <div class="base">
    <div class="first"></div>
    <div class="second"></div>
    <div class="third"></div>
  </div>
</template>

<script>
export default {
  name: "DataSheetHeader",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  min-height: 30px;
}
.base {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  min-width: 100%;
}

.first {
  min-width: 60%;
  background-color: #e3e829;
}

.second {
  min-width: 20%;
  background-color: #1d3d8f;
}

.third {
  min-width: 20%;
  background-color: #00afcc;
}
</style>
