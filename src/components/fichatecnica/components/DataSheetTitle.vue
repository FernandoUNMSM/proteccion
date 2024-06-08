<template>
  <div class="title-container">
      <span v-if="index !== ''" class="title-badget">{{index}}</span>
      <span class="title-text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: "DataSheetTitle",
  props:{
    index: String,
    text: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-container {
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  margin-bottom: 10px;
  text-align: left;
  align-items: center;
}
.title-badget{
    background-color:#1d3d8f;
    color: white;
    font-size: 12pt;
    padding: 2px 15px;
    margin-right: 5px;
}

.title-text{
    color: #1d3d8f;
    font-size: 12pt;
    font-weight: bold;
    padding-top: 2.5px;
}
</style>
