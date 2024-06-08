<template>
    <div class="table--ctn shadow-sm">
        <div class="table--title-ctn">
            <p class="p-0 m-0 table--title-style"><strong>Sectores:</strong></p>
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
    export default class TblSectores extends Vue{

        fields = [
            {key:"item", label:"Sectores"},
            {key:"valor", label: "Valor", thClass:"text-center", tdClass:"text-center"}
        ]

        items: Array<any> = []

        async getDataToTable(data:Array<any>){
          if(data){
            data = data.filter((item)=>item.codigoDistribucion=="SECTOR");
            this.items = data.sort(this.sortSectoresByValor);
          }
        }

        sortSectoresByValor(a:any, b:any){
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