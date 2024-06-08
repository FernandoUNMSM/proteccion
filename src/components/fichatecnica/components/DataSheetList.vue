<template>
  <div class="list-container">
      <ul class="list">
          <li v-for="(item, index) in data" :key="index"> 
              <span class="list-text">{{item}}</span>              
              </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "DataSheetList",
  props:{
    data: Array,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container {
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  margin-bottom: 15px;
  text-align: left;
}

.list{
    font-size: x-large;
    color: #dcddde;
    margin: 0px 20px;
    line-height: 6.5px;
    text-align: justify;
}

.list-text{
    color: black;
    font-size: 8pt;
}

</style>
