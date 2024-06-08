<template>
  <b-col md="3" class="text-center">
    <p class="m-0 p-0">NUMERO UNIDADES</p>
    <p v-if="valor != ''" class="font-weight-bold p--fsize">
      {{ valor }}
    </p>
    <p v-else>No se encuentra registro</p>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as service from "@/services/inversiones/numerounidades";

@Component
export default class ItemNumeroUnidades extends Vue {
  valor = "";

  async getDataToTable(dataTosend: any) {
    const data = await service.obtenerNumeroUnidadByPortafolio(dataTosend);
    if (data != null) {
      this.valor = data.valor;
    } else {
      this.valor = "";
    }
  }
}
</script>

<style scoped lang="stylus">
.p--fsize
    font-size 1.5rem
</style>
