<template>
    <div class="table--ctn shadow-sm">
        <div class="table--title-ctn">
            <p class="p-0 m-0 table--title-style"><strong>Maduracion y Duracion:</strong></p>
        </div>
        <div class="p-4">
            <b-table :fields="fields" :items="items" small bordered>
                <template v-slot:cell(idItemEvolucion)="data">
                    <p v-if="data.item.idItemEvolucion==4" class="p-0 m-0">De 1 a 180 días</p>
                    <p v-if="data.item.idItemEvolucion==5" class="p-0 m-0">De 180 a 365 días</p>
                    <p v-if="data.item.idItemEvolucion==6" class="p-0 m-0">De 1 a 3 años</p>
                    <p v-if="data.item.idItemEvolucion==7" class="p-0 m-0">De 3 a 5 años</p>
                    <p v-if="data.item.idItemEvolucion==8" class="p-0 m-0">Mayor a 5 años</p>
                    <p v-if="data.item.idItemEvolucion==9" class="p-0 m-0">Maduración(días)</p>
                    <p v-if="data.item.idItemEvolucion==10" class="p-0 m-0">Duración(días)</p>
                </template>
                <template v-slot:cell(maduracion)="data">
                    {{data.item.maduracion}}
                </template>
                <template v-slot:cell(duracion)="data">
                    {{data.item.duracion}}
                </template>
            </b-table>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator'
    import * as service from '@/services/inversiones/maduracionyduracion'
    @Component
    export default class TblMaduracionYDuracion extends Vue{

        fields = [
            {key:"idItemEvolucion", label:"Descripcion"},
            {key:"maduracion", label: "Maduración", thClass:"text-center", tdClass:"text-center"},
            {key:"duracion", label: "Duración", thClass:"text-center", tdClass:"text-center"},
        ]
        items = []

        public async getDataToTable(dataToSend:any){
            const data = await service.getListaModuracionYDuracion(dataToSend);
            if(data!=null){
              if(data.payload.length>0){
                this.items = data.payload.sort(this.compareIdItemEvolucion)
              }else{
                this.items = [];
              }
            }
        }

        compareIdItemEvolucion(a: any, b: any){
            let comparacion = 0;
            const item1 = a.idItemEvolucion
            const item2 = b.idItemEvolucion

            if(item1 > item2){
                comparacion = 1
            }else{
                comparacion = -1
            }
            return comparacion;
        }
    }
</script>
<style lang="stylus" scoped>
    @import "../../assets/inversiones/tablas.styl"
</style>