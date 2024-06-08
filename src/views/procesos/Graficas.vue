<template>
  <layout ref="baselayout">
    <slot>
      <div class="container">
        <b-breadcrumb>
          <b-breadcrumb-item active to="/procesos">Gr&aacute;ficas</b-breadcrumb-item>
        </b-breadcrumb>
        <l-title title="Graficas ficha tecnica"/>
        <b-row>
          <b-col class="mt-12">
            <portafolios @onChangeValue="changeCharts" ref="plist"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-12">
            <apexchart id="valor-unidad" width="100%" type="line" :options="optionsValorUnidad" :series="seriesValorUnidad" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-12">
            <apexchart id="comisiones-pagadas" width="100%" type="line" :options="optionsComisiones" :series="seriesComisiones" />
          </b-col>
        </b-row>
      </div>
    </slot>
  </layout>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import moment from "moment";
import ListaPortafolios from "@/components/portafolios/ListaPortafolios.vue";
import {formatNumber} from "@/utilities/formatters";
import * as vfServicio from "@/services/sistema/valoresfijos";

@Component({
  components: {
    portafolios: ListaPortafolios,
  }
})
export default class Graficas extends Vue {
  private portafolio: any = {};
  private optionsValorUnidad: any = {
    chart: {
      id: 'valor-unidad'
    },
    title: {
      text: 'Valor de Unidad'
    },
    xaxis: {
      categories: this.generateCategories(),
      tickAmount: 30
    },
    yaxis: {
      min: 1000,
      max: 100000,
      labels: {
        formatter: (val: any) => { return formatNumber(Number.parseInt(val), "decimal"); }
      }
    },
    dataLabels: {
        formatter: (val: any) => { return formatNumber(Number.parseInt(val), "decimal") }
    },
    noData: {
      text: 'Seleccione un portafolio'
    }
  };
  private optionsComisiones: any = {
    chart: {
      id: 'comisiones-pagadas'
    },
    title: {
      text: 'Comisiones pagadas'
    },
    xaxis: {
      categories: this.generateCategoriesComisiones(),
    },
    yaxis: {
      min: 15000,
      max: 30000,
      labels: {
        formatter: (val: any) => { return '$ ' + formatNumber(Number.parseInt(val), "decimal") + ' millones'; }
      }
    },
    noData: {
      text: 'Seleccione un portafolio'
    }
  };
  private seriesValorUnidad: Array<any> = [
    { name: 'series-1', data: [] },
  ];
  private seriesComisiones: Array<any> = [
    { name: 'series-1', data: [] },
  ];

  async changeCharts() {
    // tslint:disable-next-line
    const portafolio = (this.$refs.plist as any).selected;
    const respuesta = await vfServicio.obtenerInfoGraficoValorUnidad(portafolio);
    const data: Array<any> = [];
    respuesta.forEach((e: any) => {
      data.push({ x: e.fecha, y: e.valorUnidad });
    });
    const data1 = [{ data: data }]
    const data2 = [{ data: this.generateDataCategoriesComisiones() }]
    // eslint-disable-next-line no-undef
    ApexCharts.exec('valor-unidad', 'updateSeries', data1, true)
    // eslint-disable-next-line no-undef
    ApexCharts.exec('comisiones-pagadas', 'updateSeries', data2, true)
  }

  generateCategories() {
    const categorias: Array<any> = [];
    return categorias;
  }
  generateDataCategories() {
    const data: Array<number> = [];
    for(let i = 1; i <= 100; i++) {
      data.push(Math.floor(Math.random() * ((17500+i) - 16500) + 16500));
    }
    for(let i = 101; i <= 200; i++) {
      data.push(Math.floor(Math.random() * ((18500+i) - 17500) + 17500));
    }
    for(let i = 201; i <= 300; i++) {
      data.push(Math.floor(Math.random() * ((15000+i) - 13000) + 13000));
    }
    for(let i = 301; i <= 400; i++) {
      data.push(Math.floor(Math.random() * ((15000+i) - 14000) + 14000));
    }
    for(let i = 401; i <= 500; i++) {
      data.push(Math.floor(Math.random() * ((15500+i) - 14500) + 14500));
    }
    for(let i = 501; i <= 600; i++) {
      data.push(Math.floor(Math.random() * ((16500+i) - 15500) + 15500));
    }
    for(let i = 601; i <= 730; i++) {
      data.push(Math.floor(Math.random() * ((17500+i) - 16500) + 16500));
    }
    return data;
  }
  generateCategoriesComisiones() {
    const categories = [];
    for(let i = 1; i <= 24; i++) {
      categories.push(moment().subtract(i, "months").format("MMM YY"));
    }
    return categories.reverse();
  }
  generateDataCategoriesComisiones() {
    const data: Array<number> = [];
    for(let i = 1; i <= 24; i++) {;
      data.push(Math.floor(Math.random() * (30000 - 15000) + 15000));
    }
    return data;
  }
}
</script>
<style scoped>

</style>
