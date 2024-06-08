<template>
  <div class="DataSheet-Portfolio-Detail">
    <DataSheetTitle
      class="DataSheet-Portfolio-Detail-Title"
      index="6"
      text="Gastos y comisiones del portafolio"
    />
    <p class="DataSheet-Portfolio-Detail-SubTitle">
      Costos de una inversión de $1,000,000 en el portafolio de hace 1 año
    </p>
    <div class="DataSheet-Portfolio-Detail-values">
      <div class="DataSheet-Portfolio-Detail-value">
        <p class="title">Saldo inicial</p>
        <p>$ {{ baseBalance.saldoInicial }}</p>
      </div>
      +
      <div class="DataSheet-Portfolio-Detail-value">
        <p class="title">Rendimientos brutos</p>
        <p>$ {{baseBalance.rendimientosBrutos}}</p>
      </div>
      -
      <div class="DataSheet-Portfolio-Detail-value">
        <p class="title">Gastos y comisiones</p>
        <!-- <p>$ {{baseBalance.gastosYComisiones.replace("-","")}}</p> -->
      </div>
      =
      <div
        class="
          DataSheet-Portfolio-Detail-value DataSheet-Portfolio-Detail-result
        "
      >
        <p class="title">Saldo final</p>
        <p>$ {{baseBalance.saldoFinal}}</p>
      </div>
    </div>
    <p class="DataSheet-Portfolio-Detail-SubText">
      Los costos asociados al fondo y las comisiones pagadas a la sociedad
      administradora reducen los rendimientos totales de las inversiones. Este
      ejemplo muestra los costos de invertir $1,000,000 en este portafolio
      durante un año, asumiendo que no hay aportes ni retiros en este periodo.
    </p>

    <div class="DataSheet-Portfolio-Detail-Tables">
      <div class="DataSheet-Portfolio-Detail-Tables-Col1">
        <DataSheetTitle
          :index="''"
          text="Detalle de las comisiones del portafolio"
        />
        <DataSheetTable :data="comissionDetail" :headers="comissionDetailHeader" />
      </div>
      <div class="DataSheet-Portfolio-Detail-Tables-Col2">
        <DataSheetTitle :index="''" text="Gastos y comisiones históricas" />
        <DataSheetDataList
          :data="historicalComission"
          :headers="historicalComissionHeader"
          :showFooter="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DataSheetTitle from "./DataSheetTitle.vue";
import DataSheetTable from "./DataSheetTable.vue";
import DataSheetDataList from "./DataSheetDataList.vue";
export default {
  name: "DataSheetPortfolioDetail",
  components: {
    DataSheetTitle,
    DataSheetTable,
    DataSheetDataList,
  },
  computed: {
    baseBalance() {
      return this.$store.getters.BaseBalance;
    },
    comissionDetailHeader() {
      return this.$store.getters.ComissionDetailHeader;
    },
    comissionDetail() {
      return this.$store.getters.ComissionDetail;
    },
    historicalComissionHeader()
    {
      return this.$store.getters.HistoricalComissionHeader;
    },
    historicalComission()
    {
      return this.$store.getters.HistoricalComission;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.DataSheet-Portfolio-Detail {
  text-align: center;
  width: 100%;
  margin-bottom: 30px;
}
.DataSheet-Portfolio-Detail-Title {
  width: 40%;
  margin: auto;
}
.DataSheet-Portfolio-Detail-SubTitle {
  font-size: 10pt;
  color: #5d87a1;
}

.DataSheet-Portfolio-Detail-values {
  display: flex;
  column-gap: 20px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.DataSheet-Portfolio-Detail-value {
  display: block;
  width: 20%;
  border: 1px dashed #dcddde;
}
.DataSheet-Portfolio-Detail-value p {
  font-size: 10pt;
  margin-bottom: 5px;
}

.DataSheet-Portfolio-Detail-value .title {
  font-weight: normal;
}

.DataSheet-Portfolio-Detail-result {
  background-color: #f8f9f9;
}

.DataSheet-Portfolio-Detail-SubText {
  font-size: 6pt;
  color: #5d87a1;
}

.DataSheet-Portfolio-Detail-Tables {
  display: flex;
}

.DataSheet-Portfolio-Detail-Tables-Col1 {
  width: 60%;
}

.DataSheet-Portfolio-Detail-Tables-Col2 {
  width: 35%;
  margin-left: 25px;
}
</style>
