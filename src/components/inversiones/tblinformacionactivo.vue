<template>
    <div class="table--ctn shadow-sm">
        <div class="table--title-ctn">
            <p class="p-0 m-0 table--title-style"><strong>Información Activo:</strong></p>
        </div>
        <div class="p-4">
            <b-table :fields="fields" :items="items" small bordered>
              <template v-slot:cell(valor)="data">
                {{printValue(data.item.valor)}}
              </template>
              <template v-slot:cell(porcentaje)="data">
                {{data.item.porcentaje+'%'}}
              </template>
            </b-table>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator'
    import * as service from '@/services/inversiones/informacionactivo'
    @Component
    export default class TblInformacionActivo extends Vue{

        fields = [
            {key:"nombre", label:"Cuenta"},
            {key:"valor", label: "Valor", thClass:"text-right", tdClass:"text-right"},
            {key:"porcentaje", label: "%", thClass:"text-right", tdClass:"text-right"}
        ]
        items = []

        public async getDataToTable(dataToSend:any){
            const data = await service.obtenerInformacionActivoByPortafolio(dataToSend);
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