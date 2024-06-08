<template>
  <div class="table--ctn shadow-sm">
    <div class="table--title-ctn">
      <p class="p-0 m-0 table--title-style">
        <strong>Gastos y comisiones</strong>
      </p>
    </div>
    <div class="p-4">
      <table class="table table-bordered table-sm">
        <thead>
        <tr>
          <th scope="col">Gastos y comisiones</th>
          <th scope="col" class="text-center">Valor</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Rendimientos brutos</td>
          <td class="text-right">$ {{ this.format(Math.ceil(Math.random()*10000)) }} millones</td>
        </tr>
        <tr>
          <td>Gastos y comisiones</td>
          <td class="text-right">$ {{ this.format(Math.ceil(Math.random()*10000)) }} millones</td>
        </tr>
        <tr>
          <td>Rem. efectiv. cobrada</td>
          <td class="text-right">$ {{ this.format(Math.ceil(Math.random()*10000)) }} millones</td>
        </tr>
        <tr>
          <td>Saldo final</td>
          <td class="text-right">$ {{ this.format(Math.ceil(Math.random()*10000)) }} millones</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from "vue-property-decorator";
import { formatNumber } from "@/utilities/formatters";

@Component
export default class ItemRendimientosGastosComisiones extends Vue {
  @Prop() title: string;
  format(n: any) {
    return formatNumber(n, "decimal");
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/inversiones/tablas.styl"
</style>
