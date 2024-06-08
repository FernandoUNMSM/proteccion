<template>
  <div class="table--ctn shadow-sm">
    <div class="table--title-ctn">
      <p class="p-0 m-0 table--title-style">
        <strong>{{ this.title }}:</strong>
      </p>
    </div>
    <div class="p-4">
      <table class="table table-bordered table-sm" v-show="this.data!=null">
        <thead>
          <tr>
            <th scope="col">Periodo</th>
            <th scope="col" class="text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!idItemList.includes(iditem)">
            <td>Ultimo Mes</td>
            <td class="text-right">{{this.data!=null? this.data.ultimoMes:""}}</td>
          </tr>
          <tr v-if="!idItemList.includes(iditem)">
            <td>Ultimo Semestre</td>
            <td class="text-right">{{this.data!=null? this.data.ultimos6Meses:""}}</td>
          </tr>
          <tr>
            <td>Ultimo Año</td>
            <td class="text-right">{{this.data!=null? this.data.ultimoAnio:""}}</td>
          </tr>
          <tr>
            <td>Ultimo Dos Años</td>
            <td class="text-right">{{this.data!=null? this.data.ultimos2Anios:""}}</td>
          </tr>
          <tr>
            <td>Ultimo Tres Años</td>
            <td class="text-right">{{this.data!=null? this.data.ultimos3Anios:""}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from "moment"
import { Component, Prop } from "vue-property-decorator";
import * as rentabilidadesServices from "@/services/inversiones/rentabilidades";
@Component
export default class ItemRentabilidades extends Vue {
  @Prop() title: string;
  @Prop() iditem: number;
  private data: any = null;
  private idItemList: Array<any> = [2,3];

  async getData(dataRequest: any){
    const dataToSend = {
      fecha: moment(dataRequest.fecha).format(
          "YYYY-MM-DD"
      ),
      codigoPortafolio: dataRequest.codigoPortafolio,
      idItemEvolucion: this.iditem
    }
    const data = await rentabilidadesServices.obtenerInformacionRentabilidades(dataToSend);
    this.data = data;
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/inversiones/tablas.styl"
</style>
