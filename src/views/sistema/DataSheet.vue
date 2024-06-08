<template>
  <div>
    <button class="btn btn-primary" @click="exportDocument">Exportar</button>
    <div id="pdf" class="container">
      <div class="Ds-page">
        <DataSheetHeader />
        <HeaderInfo />
        <div class="Ds-Page1">
          <div class="Ds-row">
            <div class="first-Column">
              <div class="element-Container">
                <DataSheetTitle index="1" text="Información general del portafolio" />
                <DataSheetTable :data="generalInfo" :headers="generalInfoHeader" :showHeader="false" />
              </div>
              <div class="element-Container">
                <DataSheetTitle index="2" text="Condiciones de inversión del portafolio" />
                <DataSheetTable :data="invesmentConditions" :headers="invesmentConditionsHeader" :showHeader="false" />
              </div>
              <div class="element-Container">
                <DataSheetTitle index="3" text="Calificación del portafolio" />
                <DataSheetDataList title="información calificación" :headers="portfolioCalificationHeader"
                  :data="portfolioCalification" :showFooter="true" />
              </div>
            </div>
            <div class="second-Column">
              <div class="element-Container">
                <DataSheetTitle index="4" text="Política de inversión del portafolio" />
                <DataSheetList :data="investmentPolicy" />
              </div>
              <div class="element-Container">
                <DataSheetTitle index="5" text="Riesgos del portafolio" />
                <DataSheetList :data="portfolioRisk" />
              </div>
            </div>
          </div>
          <div style="padding-top:10px" class="DataSheet-Detail">
            <DataSheetPortfolioDetail />
          </div>
        </div>
      </div>




      <div id="page2" class="Ds-page">
        <DataSheetHeader />
        <p></p>
        <div class="Ds-lateralBar"></div>


        <div class="Ds-Page2">
          <div class="Ds-row">
            <div class="second-columns">
              <div class="element-Container">
                <DataSheetTitle
                  index="7"
                  text="Evolucion de una inversión de $ 1,000,000 en 5 años"
                />
                <Charts />
              </div>
            </div>
            <div class="firts-column">
              <div class="element-Container">
                <DataSheetTitle
                  index="8"
                  text="Rentabilidad histórica en el portafolio"
                />
                <DataSheetTable
                  :data="historicalProfitability"
                  :headers="historicalProfitabilityHeader"
                />
              </div>
              <div class="element-Container">
                <DataSheetTitle
                  index="9"
                  text="Volatilidad histórica en el portafolio"
                />
                <DataSheetTable :data="historicalVolatility" :headers="historicalVolatilityHeader" />
              </div>
            </div>
          </div>


          <div ref="portfolioInvesment" class="element-Container">
            <DataSheetTitle index="10" text="Inversiones del portafolio" />

            <div class="Ds-row">
              <div :class="portfolioInvestment.otherFactors.length > 0 ? 'Ds-Col-4':'Ds-Col-3'">
                <DataSheetTable
                  :data="portfolioInvestment.activeClasses"
                  :headers="activeClassesHeader"
                />
              </div>
              <div :class="portfolioInvestment.otherFactors.length > 0 ? 'Ds-Col-4':'Ds-Col-3'">
                <DataSheetTable
                  :data="portfolioInvestment.calification"
                  :headers="calificationHeader"
                />
              </div>
              <div :class="portfolioInvestment.otherFactors.length > 0 ? 'Ds-Col-4':'Ds-Col-3'">
                <DataSheetTable
                  :data="portfolioInvestment.economicSector"
                  :headers="economicSectorHeader"
                />
              </div>
              <div v-if="portfolioInvestment.otherFactors.length > 0" class="Ds-Col-4">
                <DataSheetTable
                  :data="portfolioInvestment.otherFactors"
                  :headers="otherFactorsHeader"
                />
              </div>
            </div>
          </div>


          <div ref="principalPortfolioInvesment" class="element-Container">
            <DataSheetTitle
              index="11"
              text="Principales inversiones del portafolio"
            />
            <DataSheetDataList
              :headers="principalPortfolioInvestmentHeader"
              :data="principalPortfolioInvestment"
              :showFooter="false"
            />
          </div>

          <div v-if="!requireNewPage()" class="element-Container">
            <DataSheetTitle
              index="12"
              text="Información adicional del portafolio y el FVP"
            />
            <p class="Datasheet-notes">
              {{ additionalInfo }}
            </p>
          </div>

          <div v-if="!requireNewPage()" class="element-Container">
            <DataSheetTitle index="13" text="Observaciones" />
            <p class="Datasheet-notes">
              {{ observations }}
            </p>
          </div>
        </div>
    </div>




    <div v-if="requireNewPage()" id="page3" class="Ds-page">
      <DataSheetHeader />
      <p></p>
      <div class="Ds-lateralBar"></div>
      <br>
      <div class="Ds-Page2">
        <div class="element-Container">
          <DataSheetTitle index="12" text="Información adicional del portafolio y el FVP" />
          <p class="Datasheet-notes">
            {{ additionalInfo }}
          </p>
        </div>
        <div class="element-Container">
          <DataSheetTitle index="13" text="Observaciones" />
          <p class="Datasheet-notes">
            {{ observations }}
          </p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import DataSheetHeader from "../../components/fichatecnica/components/DataSheetHeader.vue";
import HeaderInfo from "../../components/fichatecnica/components/HeaderInfo.vue";
import DataSheetTitle from "../../components/fichatecnica/components/DataSheetTitle.vue";
import DataSheetTable from "../../components/fichatecnica/components/DataSheetTable.vue";
import DataSheetList from "../../components/fichatecnica/components/DataSheetList.vue";
import DataSheetDataList from "../../components/fichatecnica/components/DataSheetDataList.vue";
import DataSheetPortfolioDetail from "../../components/fichatecnica/components/DataSheetPortfolioDetail.vue";
import Charts from "../../components/fichatecnica/components/Charts.vue";
import html2pdf from "html2pdf.js";
export default {
  name: "DataSheet",
  components: {
    DataSheetHeader,
    HeaderInfo,
    DataSheetTitle,
    DataSheetTable,
    DataSheetList,
    DataSheetDataList,
    DataSheetPortfolioDetail,
    Charts,
  },
  computed: {
    generalInfoHeader() {
      return this.$store.getters.GeneralInfoHeader;
    },
    generalInfo() {
      return this.$store.getters.GeneralInfo;
    },
    invesmentConditionsHeader() {
      return this.$store.getters.InvesmentConditionsHeader;
    },
    invesmentConditions() {
      return this.$store.getters.InvesmentConditions;
    },
    portfolioRisk() {
      return this.$store.getters.Risk;
    },
    observations() {
      return this.$store.getters.Observations;
    },
    portfolioCalificationHeader() {
      return this.$store.getters.PortfolioCalificationHeader;
    },
    portfolioCalification() {
      return this.$store.getters.PortfolioCalification;
    },
    investmentPolicy() {
      return this.$store.getters.InvestmentPolicy;
    },
    activeClassesHeader() {
      return this.$store.getters.ActiveClassesHeader;
    },
    calificationHeader() {
      return this.$store.getters.CalificationHeader;
    },
    economicSectorHeader() {
      return this.$store.getters.EconomicSectorHeader;
    },
    otherFactorsHeader() {
      return this.$store.getters.OtherFactorsHeader;
    },
    portfolioInvestment() {
      return this.$store.getters.PortfolioInvestment;
    },
    principalPortfolioInvestmentHeader() {
      return this.$store.getters.PrincipalPortfolioInvestmentHeader;
    },
    principalPortfolioInvestment() {
      return this.$store.getters.PrincipalPortfolioInvestment;
    },
    additionalInfoHeader() {
      return this.$store.getters.AdditionalInfoHeader;
    },
    additionalInfo() {
      return this.$store.getters.AdditionalInfo;
    },
    historicalProfitabilityHeader() {
      return this.$store.getters.HistoricalProfitabilityHeader;
    },
    historicalProfitability() {
      return this.$store.getters.HistoricalProfitability;
    },
    historicalVolatilityHeader() {
      return this.$store.getters.HistoricalVolatilityHeader;
    },
    historicalVolatility() {
      return this.$store.getters.HistoricalVolatility;
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const portfolio = urlParams.get("portfolio");
    const date = urlParams.get("date");
    const input = {
      portfolio,
      date,
    };
    console.log('aaaa')
    this.$store.dispatch("getDataSheetInfo", input);
    this.$store.dispatch("getUnitValueChart", input);
  },
  methods: {
    exportDocument: function () {
      const element = document.getElementById("pdf");
      const urlParams = new URLSearchParams(window.location.search);
      const portfolio = urlParams.get("portfolio");
      const opt = {
        margin: [0, 0],
        filename: portfolio + ".pdf",
        image: { type: "png" },
        html2canvas: { dpi: 192, scale: 1.5, letterRendering: true },
        //pagebreak: { mode: 'avoid-all', avoid: ['#page2', '#page3'] },
        jsPDF: { unit: "in", format: "A4", orientation: "p" },
      };
      html2pdf().set(opt).from(element).save();
    },
    requireNewPage: function () {
      if (this.$refs.portfolioInvesment === undefined || this.$refs.principalPortfolioInvesment === undefined) {
        return true;
      }
      return (((this.$refs.portfolioInvesment.clientHeight +
        this.$refs.principalPortfolioInvesment.clientHeight) /
        document.getElementById("page2").clientHeight) * 100) > 40;
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 8.3in;
  padding: 0px;
}

.Ds-Page1 {
  margin: auto;
  width: 97%;
}

.Ds-Page2 {
  margin: auto;
  width: 95%;
}

.Ds-row {
  display: flex;
  column-gap: 20px;
}

.Ds-Col-4 {
  width: 25%;
}

.Ds-Col-3 {
  width: 33%;
}

.first-Column {
  width: 45%;
}

.second-Column {
  width: 55%;
}

.element-Container {
  width: 100%;
}

.DataSheet-Detail {
  width: 100%;
  text-align: center;
}

.Datasheet-Title-Center {
  width: 50%;
  margin: auto;
}

.Datasheet-notes {
  font-size: 8pt;
  text-align: justify;
  line-height: 15px;
}

.Ds-lateralBar {
  float: left;
  height: calc(11in);
  width: 10px;
  background-color: #ddd2ac;
  z-index: -1;
}

.Ds-page {
  min-height: 11in;
  max-height: 11in;
  page-break-after: always;
}
</style>
