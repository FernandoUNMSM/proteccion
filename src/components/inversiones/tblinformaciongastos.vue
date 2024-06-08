<template>
  <div class="table--ctn shadow-sm">
    <div class="table--title-ctn">
      <p class="p-0 m-0 table--title-style"><strong>Información Patrimonio y Gastos:</strong></p>
    </div>
    <div class="p-4">
      <b-table :fields="fields" :items="items" small bordered>
        <template v-slot:cell(valor)="data">
          <span v-if="data.item.nombre=='% de gastos'">{{data.item.valor}}</span>
          <span v-else>{{printValue(data.item.valor)}}</span>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import * as service from '@/services/inversiones/informaciongastos'
@Component
export default class TblInformacionGastos extends Vue {
  fields = [
    { key: "nombre", label: "Cuenta" },
    { key: "valor", label: "Valor", thClass:"text-right", tdClass:"text-right"}
  ];
  items = [];

  public async getDataToTable(dataToSend:any){
    const data = await service.obtenerInformacionGastosByPortafolio(dataToSend);
    this.items = data;
  }

  printValue(valor: string){
    const number = Number(valor);
    return number.toLocaleString("es-co");
  }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/inversiones/tablas.styl"
</style>