<template>
  <div class="header-info">
    <div class="logo">
      <img src="../../../assets/logoproteccion.png" alt="">

    </div>
    <h3 class="principal-title">
      FICHA TÉCNICA - Fondos Voluntarios de Pensión
    </h3>
    <h3 class="second-title">{{portfolioName}}</h3>
    <div class="separator"></div>
    <div class="header-detail">
      <p class="subtitle">{{cutDate}}</p>
      <!-- <p class="subtitleResponse">fsafsaf</p> -->
    </div>

    <div class="subtext">
      La ficha técnica puede servir al partícipe para conocer los objetivos,
      riesgos, costos y otras condiciones relevantes para evaluar una potencial
      inversión en el portafolio. Este documento no debe ser la única fuente de
      información para la toma de decisiones de inversión. La información
      incluida refleja el comportamiento histórico del portafolio, pero no
      implica que su comportamiento en el futuro sea igual o semejante.
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderInfo",
  computed: {
    portfolioName() {
      return this.$store.getters.PortfolioName; 
    },
    cutDate(){
      return this.$store.getters.CutDate;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-info {
  margin: auto;
  width: 95%;
  text-align: left;
  padding-bottom: 20px;
}
.principal-title {
  color: #7e8083;
  font-size: 12pt;
}

.second-title {
  color: #7e8083;
  margin-bottom: 2px;
  font-size: 12pt;
}

.header-detail {
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
}

.subtitle {
  margin-top: 2px;
  color: #909396;
  width: 130px;
  font-size: 8pt;
}

.subtitleResponse {
  margin-top: 2px;
  color: #dcddde;
  font-size: 12pt;
  font-weight: bolder;
}

.separator {
  background-color: #1d3d8f;
  height: 5px;
  width: 30%;
  position: relative;
  left: -2.5%;
}

.subtext {
  margin: auto;
  width: 80%;
  text-align: center;
  font-size: 6pt;
  color: #5d87a1;
}

.logo {
  float: right;
}

.logo img {
  /* height: 80px; */
  width: 160px;
}
</style>
