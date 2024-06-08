<template>
    <div class="table--ctn shadow-sm">
        <div class="table--title-ctn">
            <p class="table--title-style m-0 p-0"><strong>Monedas</strong></p>
        </div>
        <b-table :fields="fields" small :items="items" class="p-4" sticky-header bordered>
            <template v-slot:cell(valor)="data">
                {{(parseFloat(data.item.valor)*100).toFixed(2).toString()+"%"}}
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator'
    @Component
    export default class TblMonedas extends Vue{

        fields = [
            {key:"item", label:"Monedas"},
            {key:"valor", label: "Valor", thClass:"text-center", tdClass:"text-center"}
        ]

        items: Array<any> = []

        async getDataToTable(data:Array<any>):Promise<any>{
          if(data!=null){
            data = data.filter((item)=>item.codigoDistribucion=="MONEDAS");
            this.items = data.sort(this.sortMonedasByValor);
          }
        }

        private sortMonedasByValor(a:any, b:any){
            const itema = parseFloat(a.valor);
            const itemb = parseFloat(b.valor);
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