<template>
  <div v-if="url != ''">
    <a class="btn btn-primary" @click="$router.push({path : '/Ficha', query: {portfolio : data.codigoPortafolio, date: data.fecha} })">Visualizar reporte</a>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from "vue-property-decorator";
import * as parametroService from "@/services/sistema/parametroservice";

@Component
export default class ButtonRSS extends Vue{
  @Prop()
  data: any;

  url = "";
  base = "";

  async mounted(){
    this.base = await parametroService.obtenerValorParametro("BASE_RSS");
  }

  @Watch('data', {deep:true})
  updateUrl(){
    this.url = `${this.base}Fichatecnica&PORTAFOLIO=${this.data.codigoPortafolio}&FECHA=${this.data.fecha}&rs:FORMAT=pdf`;
    console.log(this.url);
  }
}
</script>