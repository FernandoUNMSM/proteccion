<template>
    <div class="table--ctn shadow-sm">
        <div class="table--title-ctn">
            <p class="p-0 m-0 table--title-style"><strong>Top Inversiones:</strong></p>
        </div>
        <b-table :fields="fields" small :items="items" class="p-4" sticky-header bordered>
            <template v-slot:cell(participacion)="data">
                {{(parseFloat(data.item.participacion)*100).toFixed(2).toString()+"%"}}
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator'
    import * as service from '@/services/inversiones/topinversiones'
    @Component
    export default class TblTopInversiones extends Vue{

        fields = [
            {key:"emisor", label:"Emisor"},
            {key:"participacion", label: "Participación", thClass:"text-center", tdClass:"text-center"}
        ]

        items = []

        async getDataToTable(dataToSend:any){
            const data = await service.getListaTopInversiones(dataToSend);
            this.items = data.payload.sort(this.sortTopInversionesByParticipacion)
        }

        sortTopInversionesByParticipacion(a:any, b:any){
            const itema = parseFloat(a.participacion);
            const itemb = parseFloat(b.participacion);
            let comparacion = 0;
            if(itema > itemb){
                comparacion = 1
            }else{
                comparacion = -1
            }
            return (comparacion*-1);
        }

    }
</script>

<style lang="stylus" scoped>
    @import "../../assets/inversiones/tablas.styl"
</style>